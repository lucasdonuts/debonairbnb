class User < ApplicationRecord
  has_secure_password

  has_many :rentals
  has_many :items, through: :rentals

  validates :email, uniqueness: :true, presence: true
end
