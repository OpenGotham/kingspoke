require 'spec_helper'

describe King, ".decide!" do
  subject { King }

  it "returns the option with the higher sentiment value for straight text values" do
    subject.stubs(:sentiment_for).with("option 1").returns(1)
    subject.stubs(:sentiment_for).with("option 2").returns(0)

    subject.decide!("option 1", "option 2").should == {
      :answer     => "option 1",
      :sentiments => {
        "option 1" => 1,
        "option 2" => 0
      }
    }
  end

  context "when heads or tails queries" do
    it "doesn't call .sentiment_for" do
      subject.stubs(:sentiment_for)

      subject.decide!("heads", "tails")

      subject.should have_received(:sentiment_for).never
    end

    it "calls .random_decision on the inputs" do
      subject.expects(:random_decision).with("heads", "tails")

      subject.decide!("heads", "tails")
    end
  end

  context "when numbers entered" do
    it "takes a random guess if the numbered options differ by less than 1" do
      subject.expects(:random_decision).with("1", "1.5")

      subject.decide!("1", "1.5")
    end

    it "takes the larger of the inputs when the numbers differ by more than 1" do
      subject.stubs(:random_decision => true, :sentiment_for => true)

      subject.decide!("1", "5").should == { :answer => "5" }

      subject.should have_received(:random_decision).never
      subject.should have_received(:sentiment_for).never
    end
  end

  context "when twitter handles entered" do
    it "returns klout scores for each handle" do
      subject.stubs(:random_decision => true, :sentiment_for => true)

      subject.stubs(:klout_for).with("@mjording").returns(80)
      subject.stubs(:klout_for).with("@_arjuna").returns(70)

      subject.decide!("@mjording", "@_arjuna").should == {
        :answer => "@mjording",
        :klouts => {
          "@mjording" => 80,
          "@_arjuna" => 70
        }
      }

      subject.should have_received(:random_decision).never
      subject.should have_received(:sentiment_for).never
    end
  end
end
