# require 'uri'
# require 'json'

User.destroy_all
Item.destroy_all
Rental.destroy_all


User.reset_pk_sequence
Item.reset_pk_sequence
Rental.reset_pk_sequence

user1 = User.create!(first_name: "Test", last_name: "User", address: "123 Road Street", email: "test1@email.com", password: "test")
user2 = User.create!(first_name: "Test", last_name: "User", address: "123 Road Street", email: "test2@email.com", password: "test")

item1 = Item.create!(
  name: 'Blue Shirt',
  sex: 'Men',
  size: 'Large',
  category: 'Shirts',
  price: rand(10..30),
  image: 'https://n.nordstrommedia.com/id/sr3/7e5ea23d-ec69-4574-a816-350b1efc93a9.jpeg?h=365&w=240&dpr=2',
  owner: user1
)

item2 = Item.create!(
  name: 'Red Shirt',
  sex: 'Men',
  size: 'Large',
  category: 'Shirts',
  price: rand(10..30),
  image: 'https://imgs.michaels.com/MAM/assets/1/726D45CA1C364650A39CD1B336F03305/img/419DDA0DEF994AA7B1D31F4E52BCC313/10532978_r.jpg',
  owner: user2
)
# def items_dataset
#   file = File.open('db/seed_data.json')
#   items = JSON.load file
#   file.close

#   items.each do |item|
#     case item["category"]
#     when "Accessories"
#       size = ""
#       price = rand(10..30)
#     when "Men's Shoes", "Women's Shoes"
#       size = rand(6..12).to_s
#       price = rand(15..50)
#     when "Shirts"
#       size = %w( Small Medium Large XL 2XL ).sample
#       price = rand(10..30)
#     when "Coats and Jackets"
#       size = %w( Small Medium Large XL 2XL ).sample
#       price = rand(20..75)
#     when "Men's Formal", "Women's Formal"
#       size = %w( Small Medium Large XL 2XL ).sample
#       price = rand(60..150)
#     end

#     Item.create!({
#       name: item["name"],
#       image: item["image"],
#       sex: item["sex"],
#       category: item["category"],
#       size: size,
#       price: price
#     })
    
#   end
# end

# items_dataset()