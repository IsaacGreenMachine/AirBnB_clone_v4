// http://0.0.0.0:5001/api/v1/status/
$(document).ready(function () {
  const newDic = {};
  $('input').click(function () {
    $(':input').each(function () {
      if (this.checked === true) {
        newDic[$(this).data('name')] = $(this).data('id');
      } else {
        delete newDic[$(this).data('name')];
      }
    });
    const list = [];
    for (const key in newDic) {
      list.push(key);
    }
    $('.amenities h4').html(list.join(', '));
  });

  $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
    // maybe switch to 0.0.0.0
    console.trace(data);
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
});
