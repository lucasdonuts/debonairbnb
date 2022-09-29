class Rental < ApplicationRecord
  belongs_to :user
  belongs_to :item

  def due_date
    self.created_at + self.duration.days
  end
  
  def days_remaining
    (Date.parse(self.due_date.to_s) - Date.today).to_i
  end
end
