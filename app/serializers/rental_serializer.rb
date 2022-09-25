class RentalSerializer < ActiveModel::Serializer
  attributes :id, :duration, :current, :item_id, :user_id
  
  has_one :user
  has_one :item
end
