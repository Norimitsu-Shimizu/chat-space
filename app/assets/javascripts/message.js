$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="right-contents__first" data-id='${message.id}'>
                  <div class="right-contents__first__user">
                    <div class="right-contents__first__user__name"> 
                      ${message.user_name}
                    </div>
                    <div class="right-contents__first__user__time">
                      ${message.created_at}
                    </div>
                  </div>
                  <div class="right-contents__first__text">
                    <p class="lower-message__content">
                      ${content}
                    </p>
                    ${img}
                  </div>
                </div>`
    return html;
  }
  function scroll(){
    var target = $('.right-contents__first').last();
    var position = target.offset().top + $('.right-contents').scrollTop();
    $('.right-contents').animate({
      scrollTop: position}, 200, "swing");
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.right-contents').append(html);
      $('#new_message')[0].reset();
      $('.right-message__form__send').prop('disabled', false);
      scroll();
    })
    .fail(function(){
      alert('メッセージを送信できません');
    })
  });

  var reloadMessages = function(){
    var last_message_id = $('.right-contents__first:last').data('id')
    $.ajax({
      url: "api/messages",
      type: 'get',
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function (messages) {
      var insertHTML = '';
       messages.forEach(function(message) {
       insertHTML =  buildHTML(message)
        $('.right-contents').append(insertHTML);
        scroll();
      })
    })
    .fail(function() {
      ('error');
    });
  };
  setInterval(reloadMessages, 5000);
});