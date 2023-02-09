class Item < ApplicationRecord
  has_many :rentals, dependent: :destroy
  has_many :renters, through: :rentals, source: :user
  belongs_to :owner, class_name: "User",
                    foreign_key: 'owner_id'

  validates :name, :price, :image, :category, presence: true

  def available?
    self.rentals.none? { |r| r.current }
  end

  def current_rental
    self.rentals.find_by(current: true)
  end
end
