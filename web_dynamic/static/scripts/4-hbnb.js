function whichPostAreWeDoing (dict) {
  if (dict === undefined) {
    dict = '{}';
  }
  $.ajax({
    method: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify(dict),
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        $.get(
          'http://127.0.0.1:5001/api/v1/users/' + place.user_id,
          function (data) {
            const personFirstName = data.first_name;
            const personLastName = data.last_name;
            $('.places').append(
              '<article>' +
              '<div class="title_box"><h2>' +
              place.name +
              '</h2>' +
              '<div class="price_by_night">$' +
              place.price_by_night +
              '</div></div>' +
              '<div class="information"><div class="max_guest">' +
              place.max_guest +
              (place.max_guest !== 1 ? ' Guests' : ' Guest') +
              '</div>' +
              '<div class="number_rooms">' +
              place.number_rooms +
              (place.number_rooms !== 1 ? ' Bedrooms' : ' Bedroom') +
              '</div>' +
              '<div class="number_bathrooms">' +
              place.number_bathrooms +
              (place.number_rooms !== 1 ? ' Bathrooms' : ' Bathroom') +
              '</div>' +
              '</div>' +
              '<div class="user"><b>Owner: </b>' +
              personFirstName +
              ' ' +
              personLastName +
              '</div>' +
              '<div class="description">' +
              place.description +
              '</div>' +
              '</article>'
            );
          }
        );
      }
    }
  });
}
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
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  $('button').click(function () {
    const newList = [];
    for (const k in newDic) {
      newList.push(newDic[k]);
    }
    whichPostAreWeDoing({ amenities: newList });
  });
  $.ajax({
    method: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        $.get(
          'http://127.0.0.1:5001/api/v1/users/' + place.user_id,
          function (data) {
            const personFirstName = data.first_name;
            const personLastName = data.last_name;
            $('.places').append(
              '<article>' +
              '<div class="title_box"><h2>' +
              place.name +
              '</h2>' +
              '<div class="price_by_night">$' +
              place.price_by_night +
              '</div></div>' +
              '<div class="information"><div class="max_guest">' +
              place.max_guest +
              (place.max_guest !== 1 ? ' Guests' : ' Guest') +
              '</div>' +
              '<div class="number_rooms">' +
              place.number_rooms +
              (place.number_rooms !== 1 ? ' Bedrooms' : ' Bedroom') +
              '</div>' +
              '<div class="number_bathrooms">' +
              place.number_bathrooms +
              (place.number_rooms !== 1 ? ' Bathrooms' : ' Bathroom') +
              '</div>' +
              '</div>' +
              '<div class="user"><b>Owner: </b>' +
              personFirstName +
              ' ' +
              personLastName +
              '</div>' +
              '<div class="description">' +
              place.description +
              '</div>' +
              '</article>'
            );
          }
        );
      }
    }
  });
});
