class DecisionsController < ApplicationController
  def create
    render :json => King.decide!(params[:option_1], params[:option_2])
  end
end
