class Player < ActiveRecord::Base
  has_many :game_states
  has_many :games, through: :game_states
end
