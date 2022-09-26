class SessionsController < ApplicationController
  skip_before_action :authenticate, only: [:create]

  def create
    user = User.find_by(email: params[:email])
    if user&.authenticate(params[:password])
      session[:user_id] = user.id
      render json: user, status: :created
    elsif user
      render json: { errors: ['Incorrect password'] }, status: :unauthorized
    else
      render json: { errors: ['We could not find a user with that email address'] }, status: :not_found
    end
  end

  def destroy
    session.delete(:user_id)
    head :no_content
  end

end
