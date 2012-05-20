class TwiliosController < ApplicationController
  def create
    $twilio_client.account.sms.messages.create(
      :from => '+16464612551',
      :to => params[:phone_number],
      :body => "You asked me to choose between #{params[:option_1]} and #{params[:option_2]}. I order you to choose #{params[:answer]}"
    )
    render :json => { :foo => "bar" }
  end
end
