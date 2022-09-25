class ApplicationController < ActionController::API
  include ActionController::Cookies

  rescue_from ActiveRecord::RecordNotFound, with: :not_found_response
  rescue_from ActiveRecord::RecordInvalid, with: :invalid_record_response

  private

  def not_found_response(error)
    render json: { errors: error.message }, status: :not_found
  end

  def invalid_record_response(invalid)
    render json: { errors: invalid.record.errors.full_messages }, status: :unprocessable_entity
  end
  # syntax needed to access specific error details
  # e.attribute.to_s.gsub(/_/, " ").capitalize + " " + e.message.downcase
  
end
