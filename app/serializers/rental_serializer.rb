class RentalSerializer < ActiveModel::Serializer
  attributes :id, :duration, :current, :item
  
  belongs_to :user
  belongs_to :item

  def item
    object.item
  end
end
