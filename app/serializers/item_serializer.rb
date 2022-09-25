class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :sex, :category, :size, :price, :image

  has_many :rentals
  has_many :users
end
