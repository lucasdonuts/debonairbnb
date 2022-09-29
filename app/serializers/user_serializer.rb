class UserSerializer < ActiveModel::Serializer
  attributes :id,
            :first_name,
            :last_name,
            :email,
            :address,
            :current_rentals
            # :is_currently_borrowing

  has_many :rentals
  has_many :items
end
