class RentalsController < ApplicationController

  def show
    rental = Rental.find!(params[:id])
    render json: rental, include: ['item'], status: :ok
  end

  def create
    user = User.find(session[:user_id])
    rental = user.rentals.create!(rental_params)
    rental.update!(current: true);
    render json: rental, status: :created
  end

  def update
    rental = Rental.find_by(current: true, user_id: params[:user_id], item_id: params[:item_id])
    rental.update!(rental_params)
    render json: rental, status: :accepted
  end

  private

  def rental_params
    params.permit(:user_id, :item_id, :duration, :current)
  end

end
