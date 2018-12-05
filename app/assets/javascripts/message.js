$(document).on('turbolinks:load', function() {
$(function(){
  function appendMessage(message){
    var image =  (message.image) ? `<img class="lower-message__image" src="${message.image}">` : '';
      var html =`
        <div class = "message">
          <div class = "message__box" data-message-id =" ${message.id}">
            <div class = "upper-message">
              <div class ="upper-message__user-name">
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
          </div>
        </div>`
      return html;
  }
  $('#new_message').on('submit', function(e){
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
      $('.messages.js-messages').append(html);
      $('.message__box').animate({scrollTop: $('.message__box')[0].scrollHeight},'fast');
      $('.form__message.js-content').val('');
    })
    .fail(function(){
      alert('error');
    })
    .always(function(){
      $('.form__submit').prop('disabled', false);
    });
  })

    var interval = setInterval(function() {
      if (window.location.href.match(/\/groups\/\d+\/messages/)) {
      var lastMessageId = $('.message__box').last().attr('data-message-id');
        $.ajax({
          url: window.location.href,
          data: {id: lastMessageId},
          dataType: 'json'
        })
        .done(function(data) {
          var insertHTML = '';
            data.forEach(function(message) {
                insertHTML += appendMessage(message);
                $('.messages').append(insertHTML);
                $('.messages.js-messages').animate({scrollTop: $('.messages.js-messages')[0].scrollHeight},'fast');
            });
        })
        .fail(function(data) {
          alert('自動更新に失敗しました');
        });
      }
      else {
        clearInterval(interval);
      }} , 5000 );
    });
  });