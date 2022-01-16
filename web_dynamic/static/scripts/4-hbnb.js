// function to send post request to website based on which checkboxes are checked
function whichPostAreWeDoing (dict) {
  if (dict === undefined) {
    dict = '{}';
  }
  // post method to fetch filtered Place objects from website
  $.ajax({
    method: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify(dict),
    // adds Place objects and data to HTML using append method
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        // get request for user first/last name for place
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
// starts jquery actions when DOM is ready
$(document).ready(function () {
  const newDic = {};
  // when search button is clicked
  $('input').click(function () {
    // for each checkbox that is checked:
    $(':input').each(function () {
      if (this.checked === true) {
        // adds all checked amenities as {name: id} to newDic
        newDic[$(this).data('name')] = $(this).data('id');
      } else {
        // removes any non-checked amenities from newDic
        delete newDic[$(this).data('name')];
      }
    });
    const list = [];
    // adds all checked amenity names to list
    for (const key in newDic) {
      list.push(key);
    }
    // lists all checked amenitiy names to h4 tag under "Amenities"
    $('.amenities h4').html(list.join(', '));
  });

  // gets API status from status page
  $.get('http://127.0.0.1:5001/api/v1/status/', function (data) {
  // maybe switch to 0.0.0.0
    console.trace(data);
    // changes color of status button using CSS available class
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
  // post method to fetch all Place objects from website
  $.ajax({
    method: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    // adds Place objects and data to HTML using append method
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
