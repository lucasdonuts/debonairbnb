class RentalsController < ApplicationController

  def show
    rental = Rental.find!(params[:id])
    render json: rental, status: :ok
  end

  def create
    user = User.find(session[:user_id])
    if Rental.where(item_id: params[:item_id], user_id: user.id, current: true).empty?
      rental = user.rentals.create!(rental_params)
      rental.update!(current: true);
      render json: rental, status: :created
    else
      render json: { errors: "Item is currently unavailable" }, status: :forbidden
    end
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
