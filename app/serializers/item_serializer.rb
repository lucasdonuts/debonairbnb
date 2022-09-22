class ItemSerializer < ActiveModel::Serializer
  attributes :id, :sex, :category, :size, :price

  has_many :rentals
end
