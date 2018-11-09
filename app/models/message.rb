class Message < ApplicationRecord
  belongs_to :user
  belongs_to :group
  
  validates :content, presence: true
#  validates :image, presence: true
  
  mount_uploader :image, ImageUploader
end
