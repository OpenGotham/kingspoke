require 'spec_helper'

describe String, "#is_numeric?" do
  it "returns true if the string is a number" do
    "123.34".is_numeric?.should == true
    "123".is_numeric?.should == true
  end
  it "returns false if the string is not a number" do
    "xyZ".is_numeric?.should == false
  end
end
