# README

This README would normally document whatever steps are necessary to get the
application up and running.

Things you may want to cover:

* Ruby version

* System dependencies

* Configuration

* Database creation

* Database initialization

* How to run the test suite

* Services (job queues, cache servers, search engines, etc.)

* Deployment instructions

* ...

##usersテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false|
|email|string|null: false, unique: true|
|password|string|null: false|

###Association
-has_many :members, dependent: :destroy
-has_many :groups, through: :members, dependent: :destroy
-has_many :messages, dependent: :destroy

##messagesテーブル
|Column|Type|Option|
|------|----|------|
|body|text|null: false|
|image|string|-------|
|user_id|integer|null: false, foreign_key: true, index: true|
|group_id|integer|null: false, foreign_key: true, index: true|

###Association
-belogs_to :user
-belongs_to :group

##groupsテーブル
|Column|Type|Option|
|------|----|------|
|name|string|null: false|

###Association
-has_many :members, dependent: :destroy
-has_many :users, through: :members dependent: :destroy
-has_many :messages, dependent: :destroy


## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true, index: true|
|group_id|integer|null: false, foreign_key: true, index: true|

### Association
-belongs_to :group
-belongs_to :user