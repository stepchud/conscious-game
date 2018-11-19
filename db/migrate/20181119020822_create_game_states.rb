class CreateGameStates < ActiveRecord::Migration[5.2]
  def change
    create_table :game_states do |t|
      t.belongs_to :player
      t.belongs_to :game
      t.json       :card_hand
      t.json       :law_hand
      t.json       :parts_of_parts
      t.json       :food_diagram

      t.timestamps
    end
  end
end
