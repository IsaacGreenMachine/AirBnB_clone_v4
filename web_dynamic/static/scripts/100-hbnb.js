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
  const cityDict = {};
  const stateDict = {};
  $('input', '.amenities').click(function () {
    $(':input', '.amenities').each(function () {
      if (this.checked === true) {
        console.log($(this).data('name'), $(this).data('id'));
        newDic[$(this).data('name')] = $(this).data('id');
      } else {
        delete newDic[$(this).data('name')];
      }
    });
    const list = [];
    for (const key in newDic) {
      list.push(key);
    }
    console.log(list);
    $('.amenities h4').html(list.join(', '));
  });

  $('input', '.locations').click(function () {
    $(':input', '.locations').each(function () {
      if (this.checked === true) {
        if ($(this).data('type') === 'state') {
          stateDict[$(this).data('name')] = $(this).data('id');
        }
        if ($(this).data('type') === 'city') {
          cityDict[$(this).data('name')] = $(this).data('id');
        }
      } else {
        if ($(this).data('type') === 'state') {
          delete stateDict[$(this).data('name')];
        }
        if ($(this).data('type') === 'city') {
          delete cityDict[$(this).data('name')];
        }
      }
    });
    const cityList = [];
    const stateList = [];
    for (const key in cityDict) {
      cityList.push(key);
    }
    for (const key in stateDict) {
      stateList.push(key);
    }
    console.log(cityList);
    console.log(stateList);
    $('.locations h4').html(cityList.concat(stateList).sort().join(', '));
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
    const listAmenities = [];
    const listCities = [];
    const listStates = [];
    for (const k in newDic) {
      listAmenities.push(newDic[k]);
    }
    for (const k in cityDict) {
      listCities.push(cityDict[k]);
    }
    for (const k in stateDict) {
      listStates.push(stateDict[k]);
    }
    console.log(listAmenities, listCities, listStates);
    whichPostAreWeDoing({ amenities: listAmenities, cities: listCities, states: listAmenities });
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
