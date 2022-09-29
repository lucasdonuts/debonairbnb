class ItemSerializer < ActiveModel::Serializer
  attributes :id, :name, :sex, :category, :size, :price, :image, :created_at

  has_many :rentals
  has_many :users

  def created_at
    object.created_at.strftime("%B %e, %Y %l:%M %p")
  end
end
