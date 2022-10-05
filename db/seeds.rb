require 'uri'
require 'json'

User.destroy_all
Item.destroy_all
Rental.destroy_all


User.reset_pk_sequence
Item.reset_pk_sequence
Rental.reset_pk_sequence

user1 = User.create!(first_name: "Test", last_name: "User", address: "123 Road Street", email: "test1@email.com", password: "test")
user2 = User.create!(first_name: "Test", last_name: "User", address: "123 Road Street", email: "test2@email.com", password: "test")

def items_dataset
  file = File.open('db/seed_data.json')
  items = JSON.load file
  file.close

  items.each do |item|
    case item["category"]
    when "Accessories"
      size = ""
      price = rand(10..30)
    when "Men's Shoes", "Women's Shoes"
      size = rand(6..12).to_s
      price = rand(15..50)
    when "Shirts"
      size = %w( Small Medium Large XL 2XL ).sample
      price = rand(10..30)
    when "Coats and Jackets"
      size = %w( Small Medium Large XL 2XL ).sample
      price = rand(20..75)
    when "Men's Formal", "Women's Formal"
      size = %w( Small Medium Large XL 2XL ).sample
      price = rand(60..150)
    end

    Item.create!({
      name: item["name"],
      image: item["image"],
      sex: item["sex"],
      category: item["category"],
      size: size,
      price: price
    })
    
  end
end

items_dataset()