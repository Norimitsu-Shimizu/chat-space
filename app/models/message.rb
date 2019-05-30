class Message < ApplicationRecord

  belongs_to :user
  belongs_to :group

  validates :contents, presence: true, unless: :image?
  mount_uploader :image, ImageUploader
end
