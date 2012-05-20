class King
  require 'uri'
  require "net/http"
  require 'rubygems'
  require 'twitter'
  require 'json'

  def self.decide!(option_1, option_2)
    if ["heads", "tails"].include?(option_1) && ["heads", "tails"].include?(option_2)
      random(option_1, option_2)
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
end
