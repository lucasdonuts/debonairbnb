class User < ApplicationRecord
  has_secure_password

  has_many :rentals
  has_many :items, through: :rentals

  validates :first_name, :last_name, :address, presence: true
  validates :email, uniqueness: :true, presence: true

  def current_rentals
    self.rentals.where(current: true)
  end

  # def is_currently_borrowing
  #   # !self.rentals.where(item_id: itemID, current: true).empty?
  #   self.current_rentals.any? { |r| r.item_id == params[:id] }
  # end
end
