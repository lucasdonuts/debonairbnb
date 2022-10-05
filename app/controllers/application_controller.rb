class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :invalid_record_response

  before_action :authenticate

  def current_user
    @current_user = User.find_by(id: session[:user_id])
  end

  private

  def authenticate
    render json: { error: "Not Authorized" }, status: :unauthorized unless current_user
  end

  def not_found_response(error)
    render json: { errors: error.message }, status: :not_found
  end

  def invalid_record_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end
  
end
