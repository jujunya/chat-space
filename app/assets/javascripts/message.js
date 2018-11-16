$(function(){
  function appendMessage(message){
    var image =  (message.image) ? `<img class="lower-message__image" src="${message.image}">` : "";
    var html =`
    <div class = "message">
      <div class = "upper-message">
        <div class "upper-message__user-name">
          ${message.name}
        </div>
        <div class = "upper-message_date">
          ${message.created_at}
        </div>
      </div>
      <div class = "lower-message">
        <div class = "lower-message__count">
            <p class ="lower-message__content">
              ${message.content}
              ${image}
            </p>
        </div>
      </div>
    </div>`
      return html;
  }
  
  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formdata = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formdata,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = appendMessage(message);
      console.log(html);
      $('.messages.js-messages').append(html);
      $('.messages.js-messages').animate({scrollTop: $('.messages.js-messages')[0].scrollHeight},'fast');
      $('.form__message.js-content').val('');
    })
    .fail(function(){
      alert('error');
    })
  })
});