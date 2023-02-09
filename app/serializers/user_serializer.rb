class UserSerializer < ActiveModel::Serializer
  attributes :id,
            :first_name,
            :last_name,
            :email,
            :address,
            :current_rentals,
            :past_rentals

  has_many :rentals
  has_many :rented_items
  has_many :items_for_rent
end
