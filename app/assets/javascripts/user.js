$(document).on('turbolinks:load', function() {
$(function() {
  
  var search_list = $("#user-search-result");
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                <p class="chat-group-user__name">${user.name}</p>
                <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</a>
                </div>`
    search_list.append(html);
  }
  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${group.users.name}</p>
                </div>`
    search_list.append(html);
  }
  var user_list = $('#chat-group-users');
  function addUser(user_id,user_name){
    var html = `<div class="chat-group-user clearfix js-chat-member" id="chat-group-user">
                  <input name="group[user_ids][]" type="hidden" value="${user_id}">
                   <p class="chat-group-user__name">${user_name}</p>
                  <a class="user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn">削除</a>
                </div>`
    user_list.append(html);
  }
  
  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();
    if (input.length !== 0) {
      $.ajax({
        url: '/users',
        type: 'GET',
        data: {keyword: input},
        dataType: 'json'
      })
      .done(function(users){
        $('#user-search-result').empty();
        if (users.length !== 0) {
          users.forEach(function(user){
            appendUser(user);
          });
        }
        else{
          appendNoUser("一致するユーザー名はありません");
        }
      })
      .fail(function(){
        alert('検索に失敗しました。');
      })
    }
    else{
      $('#user-search-result').empty();
    }
  });
  $('#user-search-result').on('click','.user-search-add',function(){
    var user_name = $(this).attr('data-user-name');
    var user_id = $(this).attr('data-user-id');
    addUser(user_id,user_name);
    $(this).parent().remove();
  })
  $('#chat-group-users').on('click', '.js-remove-btn', function(){
      $(this).parent().remove();
  })
});
});