require 'twilio-ruby'

account_sid = "ACfb1c761f26314016abb40f7029934e9a"
auth_token = "d626404bc4da778d97cee6cb26065840"

$twilio_client = Twilio::REST::Client.new account_sid, auth_token
