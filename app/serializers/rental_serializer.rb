class RentalSerializer < ActiveModel::Serializer
  attributes :id,
    :duration,
    :current,
    :created_at,
    :due_date,
    :days_remaining
  
  belongs_to :user
  belongs_to :item

  def created_at
    object.created_at.strftime("%B %e, %Y")
  end
end
