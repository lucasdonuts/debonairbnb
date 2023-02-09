class User < ApplicationRecord
  has_secure_password

  has_many :rentals, dependent: :destroy
  has_many :rented_items, through: :rentals, source: :item
  has_many :items_for_rent, class_name: "Item",
                            foreign_key: "owner_id",
                            dependent: :destroy

  validates :first_name, :last_name, :address, presence: true
  validates :email, uniqueness: :true, presence: true

  def current_rentals
    self.rentals.where(current: true)
  end

  def past_rentals
    self.rentals.where(current: false)
  end
end
