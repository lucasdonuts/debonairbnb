class RentalSerializer < ActiveModel::Serializer
  attributes :id, :duration, :current, :item, :user
  
  belongs_to :user
  belongs_to :item

  def item
    object.item
  end

  def user
    object.user
  end
end
