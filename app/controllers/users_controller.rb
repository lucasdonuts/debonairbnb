class UsersController < ApplicationController
  skip_before_action :authenticate, only: [:create]
  
  def show
    user = User.find_by(id: session[:user_id])
    if user
      render json: user, status: :ok
    else
      render json: { errors: 'Must be logged in' }, status: :unauthorized
    end
  end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  def update
    user = find_user
    user.update!(user_params)
    render json: user, status: :accepted
  end

  def destroy
    user = find_user
    user.destroy
    head :no_content
  end

  private

  def find_user
    User.find(params[:id])
  end

  def user_params
    params.permit(:first_name, :last_name, :address, :email, :password, :password_confirmation)
  end

end
