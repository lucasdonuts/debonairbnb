class Item < ApplicationRecord
  has_many :rentals
  has_many :users, through: :rentals

  validates :name, :price, :image, :category, :size, presence: true
  validate :availability

  def availability
    if self.rentals.any?{ |r| r.current }
      errors.add("Item is already rented")
    end
  end

end
