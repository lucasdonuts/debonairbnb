class ItemSerializer < ActiveModel::Serializer
  attributes :id,
    :name,
    :sex,
    :category,
    :size,
    :price,
    :image,
    :available?,
    :current_rental

  has_many :rentals
  has_many :renters
  belongs_to :owner
end
