$(document).on('turbolinks:load', function(){

  var usersList = $('#user-search-result');
  
  function appendUser(user){
    var html = `<div class="chat-group-user clearfix">
                  <p class="chat-group-user__name">${user.name}</p>
                  <div class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id="${user.id}" data-user-name="${user.name}">追加</div>
                </div>`
    usersList.append(html);
  }

  function appendErrMsgToHTML(msg) {
    var html = `<div class="chat-group-user clearfix">${ msg }</div>`
    usersList.append(html);
  }

  function appendMemberList(name,id){
  
    var html = `<div class='chat-group-user clearfix js-chat-member' id='chat-group-user-8'>
                  <input name='group[user_ids][]' type='hidden' value='${id}'>
                  <p class='chat-group-user__name'>${name}</p>
                  <div class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</div>
                </div>`
    return html

  }
 
  $('#user-search-field').on('keyup', function(){
    var input = $('#user-search-field').val();
    $.ajax({
      url: '/users',
      type: 'GET',
      data: { name: input },
      dataType: 'json'
    })

    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      }
      else {
        appendErrMsgToHTML("一致するユーザーはいません")
      }
    })
    .fail(function() {
      alert('error')
    });
  });


  $('#user-search-result').on('click', '.user-search-add', function(){
    var name = $('.user-search-add').data('user-name');
    var id = $('.user-search-add').data('user-id');
    var html = appendMemberList(name, id);
    $(this).parent().remove();
    $('#chat-group-users').append(html);
    
  })

  $('#chat-group-users').on('click', '.user-search-remove', function(){
    $(this).parent().remove();
  })
});