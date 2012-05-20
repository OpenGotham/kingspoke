class King
  require 'uri'
  require "net/http"
  require 'rubygems'
  require 'twitter'
  require 'json'

  def self.decide!(option_1, option_2)
    if options_are_heads_or_tails?(option_1, option_2)
      random_decision(option_1, option_2)
    elsif options_differ_by_greater_than?(option_1, option_2, 1)
      return option_1.to_f > option_2.to_f ? option_1 : option_2
    elsif options_differ_by_greater_than?(option_1, option_2, 0)
      random_decision(option_1, option_2)
    else
      sentiment_for(option_1) > sentiment_for(option_2) ? option_1 : option_2
    end
  end

  private

  def self.sentiment_for(option)
    count = 0
    aggregate_score = 0
    Twitter.search("#{option}", :rpp => 10, :result_type => "recent").map do |status|
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
end
