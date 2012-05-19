class DecisionsController < ApplicationController
  def create
    answer = rand(2) == 0 ? params[:option_1] : params[:option_2]
    render :json => { :answer => answer }
  end
end
