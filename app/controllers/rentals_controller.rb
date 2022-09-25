class RentalsController < ApplicationController

  def show
    rental = Rental.find!(params[:id])
    render json: rental, status: :ok
  end

  def create
    rental = Rental.create!(rental_params)
    render json: rental, status: :created
  end

  private

  def rental_params
    params.permit()
  end

end
