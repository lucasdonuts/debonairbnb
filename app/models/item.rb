class Item < ApplicationRecord
  has_many :rentals
  has_many :users, through: :rentals

  validates :name, :price, :image, :category, :size, presence: true

end
