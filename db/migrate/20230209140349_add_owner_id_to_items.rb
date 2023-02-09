class AddOwnerIdToItems < ActiveRecord::Migration[7.0]
  def change
    add_reference :items, :owner, foreign_key: { to_table: :users }
  end
end
