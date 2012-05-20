class King
  require 'uri'
  require "net/http"
  require 'rubygems'
  require 'twitter'
  require 'json'

  def self.decide!(option_1, option_2)
    result_hash = {}
    if options_are_heads_or_tails?(option_1, option_2)
      result_hash[:answer] = random_decision(option_1, option_2)
    elsif options_are_twitter_handles(option_1,option_2)
      option_1_klout = klout_for(option_1)
      option_2_klout = klout_for(option_2)
      result_hash[:answer] =  option_1_klout > option_2_klout ? option_1 : option_2
      result_hash[:klouts] = {
        "#{option_1}" => option_1_klout,
        "#{option_2}" => option_2_klout
      }

    elsif options_differ_by_greater_than?(option_1, option_2, 1)
      result_hash[:answer] = option_1.to_f > option_2.to_f ? option_1 : option_2
    elsif options_differ_by_greater_than?(option_1, option_2, 0)
      result_hash[:answer] = random_decision(option_1, option_2)
    else
      option_1_sentiment = sentiment_for(option_1)
      option_2_sentiment = sentiment_for(option_2)
      result_hash[:answer] = option_1_sentiment > option_2_sentiment ? option_1 : option_2
      result_hash[:sentiments] = {
        "#{option_1}" => option_1_sentiment,
        "#{option_2}" => option_2_sentiment
      }
      sentiment_for(option_1) > sentiment_for(option_2) ? option_1 : option_2
    end
    result_hash
  end

  def self.klout_for(handle)
    k = Klout::API.new
    klout_id = k.identity(handle[1..-1])
    score = k.user klout_id['id'], :score
    score['score']
  end

  private

  def self.sentiment_for(option)
    count = 0
    aggregate_score = 0
    Twitter.search("#{option}", :rpp => 20, :result_type => "recent").map do |status|
      aggregate_score += score_for_tweet(status)
      count += 1
    end

    aggregate_score / count
  end

  def self.score_for_tweet(tweet)
    uri = URI("http://api.metalayer.com/s/datalayer/1/sentiment")
    response = Net::HTTP.post_form(uri, 'text' => tweet.text)
    hash = JSON.parse(response.body)
    hash["response"]["datalayer"]["sentiment"]
  end

  def self.random_decision(option_1, option_2)
    rand(2) == 0 ? option_1 : option_2
  end

  def self.options_are_heads_or_tails?(option_1, option_2)
    ["heads", "tails"].include?(option_1) && ["heads", "tails"].include?(option_2)
  end

  def self.options_differ_by_greater_than?(option_1, option_2, difference_threshold)
    if option_1.is_numeric? && option_2.is_numeric?
      (option_1.to_f - option_2.to_f).abs > difference_threshold
    else
      false
    end
  end

  def self.options_are_twitter_handles(option_1, option_2)
    if option_1.starts_with?('@') && option_2.starts_with?('@')
      true
    else
      false
    end
  end
end
