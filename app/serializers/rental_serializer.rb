class RentalSerializer < ActiveModel::Serializer
  attributes :id,
    :duration,
    :current,
    :created_at,
    :due_date,
    :days_remaining,
    :item,
    :user
  
  belongs_to :user
  belongs_to :item

  def created_at
    object.created_at.strftime("%B %e, %Y")
  end

  def item
    object.item
  end

  def user
    object.user
  end
end
