class User < ApplicationRecord
  has_secure_password

  has_many :rentals
  has_many :items, through: :rentals

  validates :first_name, :last_name, :address, presence: true
  validates :email, uniqueness: :true, presence: true

  def current_rentals
    self.rentals.where(current: true)
  end

  def past_rentals
    self.rentals.where(current: false)
  end
end
