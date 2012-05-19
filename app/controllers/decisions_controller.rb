class DecisionsController < ApplicationController
  def create
    render :json => { :answer => King.decide!(params[:option_1], params[:option_2]) }
  end
end
