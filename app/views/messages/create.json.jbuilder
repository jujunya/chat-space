  json.id         @message.id
  json.name       @message.user.name
  json.created_at @message.created_at.to_s(:datetime)
  json.content    @message.content
  json.image      @message.image.url
