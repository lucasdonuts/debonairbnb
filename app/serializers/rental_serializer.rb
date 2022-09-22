class RentalSerializer < ActiveModel::Serializer
  attributes :id, :duration, :current
  
  has_one :user
  has_one :item
end
