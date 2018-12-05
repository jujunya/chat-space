
json.array! @new_messages.each do |message|
  json.name         message.user.name
  json.created_at   message.created_at.to_s(:datetime)
  json.content      message.content
  json.image        message.image.url
  json.id           message.id
end