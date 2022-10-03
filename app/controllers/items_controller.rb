class ItemsController < ApplicationController

  def index
    items = Item.all
    render json: items, include: ['rentals', 'rentals.user'],  status: :ok
  end
  
  def show
    item = Item.find(params[:id])
    render json: item, include: ['rentals', 'rentals.user'],  status: :ok
  end

  def create
    item = Item.create!(item_params)
    render json: item, status: :created
  end

  private

  def item_params
    params.permit(:name, :image, :sex, :category, :size, :price)
  end

end
