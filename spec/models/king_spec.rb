require 'spec_helper'

describe King, ".decide!" do
  subject { King }

  it "returns the option with the higher sentiment value for straight text values" do
    subject.stubs(:sentiment_for).with("option 1").returns(1)
    subject.stubs(:sentiment_for).with("option 2").returns(0)

    subject.decide!("option 1", "option 2").should == "option 1"
  end

  context "when heads or tails queries" do
    it "doesn't call .sentiment_for" do
      subject.stubs(:sentiment_for)

      subject.decide!("heads", "tails")

      subject.should have_received(:sentiment_for).never
    end

    it "returns the result of .random_decision" do
      subject.stubs(:random_decision => "heads")

      subject.decide!("heads", "tails").should == "heads"

      subject.stubs(:random_decision => "tails")

      subject.decide!("heads", "tails").should == "tails"
    end
  end

  context "when numbers entered" do
    it "takes a random guess if the numbered options differ by less than 1"
    it "takes the larger of the inputs when the numbers differ by more than 1"
  end
end
