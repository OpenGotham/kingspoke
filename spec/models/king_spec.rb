require 'spec_helper'

describe King, ".decide!" do
  subject { King }

  it "returns the option with the higher sentiment value" do
    subject.stubs(:sentiment_for).with("option 1").returns(1)
    subject.stubs(:sentiment_for).with("option 2").returns(0)

    subject.decide!("option 1", "option 2").should == "option 1"
  end
end
