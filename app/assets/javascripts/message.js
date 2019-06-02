$(document).on('turbolinks:load',function(){
  function buildHTML(message){
    var content = message.content ? `${ message.content }` : "";
    var img = message.image ? `<img src= ${ message.image }>` : "";
    var html = `<div class="right-contents__first">
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
    .done(function(data){
      var html = buildHTML(data);
      $('.right-contents').append(html);
      $('.right-message__form__text').val('');
      $('.right-message__form__label__file').val('');
      $('.right-message__form__send').prop('disabled', false);
      scroll()
    })
    .fail(function(){
      alert('メッセージを送信できません');
    })
  });
});