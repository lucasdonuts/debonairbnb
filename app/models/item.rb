class Item < ApplicationRecord
  has_many :rentals
  has_many :users, through: :rentals

  validates :name, :price, :image, :category, :size, presence: true

  def available?
    self.rentals.none? { |r| r.current }
  end

  def current_rental
    self.rentals.find_by(current: true)
  end
end
