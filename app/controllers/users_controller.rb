class UsersController < ApplicationController

  def show
    user = User.find(params[:id])
    render json: user, status: :ok
  end

  # def show
  #   user = User.find_by(id: session[:user_id])
  #   if user
  #     render json: user, status: :ok
  #   else
  #     render json: { errors: ['Must be logged in'] }, status: :unauthorized
  #   end
  # end

  def create
    user = User.create!(user_params)
    session[:user_id] = user.id
    render json: user, status: :created
  end

  # def current_user
  #   user = User.find_by(id: session[:user_id])
  #   if user
  #     render json: user, serializer: UserSerializer, status: :ok
  #   else
  #     render json: { errors: ['Must be logged in'] }, status: :unauthorized
  #   end
  # end

  private

  def user_params
    params.permit(:first_name, :last_name, :address, :email, :password, :password_confirmation)
  end

end
