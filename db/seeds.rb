require 'uri'
require 'json'
# require_relative './api_data.json'

User.destroy_all
Item.destroy_all
# Rental.destroy_all


User.reset_pk_sequence
Item.reset_pk_sequence
# Rental.reset_pk_sequence

user1 = User.create!(first_name: "Test", last_name: "User", address: "123 Road Street", email: "test1@email.com", password: "test")
user2 = User.create!(first_name: "Test", last_name: "User", address: "123 Road Street", email: "test2@email.com", password: "test")

def items_dataset
  file = File.open('db/api_data.json')
  items = JSON.load file
  file.close

  items.each do |item|

    Item.create!({
      name: item["name"],
      image: item["image"],
      sex: item["sex"],
      category: item["category"],
      size: %w( Small Medium Large XL 2XL ).sample,
      price: item["price"].to_i
    })
    
  end
end

items_dataset()