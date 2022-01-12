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
});
