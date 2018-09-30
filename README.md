## membersテーブル

|Column|Type|Options|
|------|----|-------|
|user_id|integer|null: false, foreign_key: true|
|group_id|integer|null: false, foreign_key: true|

### Association
- belongs_to :group
- belongs_to :user


## uersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, add_index|
|email|text|null: false, unique: true|
|passward|text|null: false|

### Association
- has_many:members
- has_many:groups, through: :members
- has_many:messages


## groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null:false, unique: true|


### Association
- has_many:members
- has_many:users, through: :members
- has_many:messages


## messagesテーブル

|Column|Type|Options|
|------|----|-------|
|body|text|null: false|
|image|string||
|group_id|integer|null: false, foreign_key: true|
|users_id|integer|null: false, foreign_key: true|

### Association
- belongs_to:user
- belongs_to:group