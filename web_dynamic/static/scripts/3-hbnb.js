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
    if (data.status === 'OK') {
      $('#api_status').addClass('available');
    } else {
      $('#api_status').removeClass('available');
    }
  });
  $.ajax({
    method: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: '{}',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        console.log(place);
        $.get('http://127.0.0.1:5001/api/v1/users/' + place.user_id, function (data) {
            console.log(data)
            let person_first_name = data.first_name;
            let person_last_name = data.last_name;
        $('.places').append(
            '<article>' +
            '<div class="title_box"><h2>' + place.name + '</h2>' +
            '<div class="price_by_night">$' + place.price_by_night + '</div></div>' +
            '<div class="information"><div class="max_guest">' + place.max_guest + (place.max_guest != 1 ? ' Guests' : ' Guest') + "</div>" +
            '<div class="number_rooms">' + place.number_rooms + (place.number_rooms != 1 ? ' Bedrooms' : ' Bedroom') + '</div>' +
            '<div class="number_bathrooms">' + place.number_bathrooms + (place.number_rooms != 1 ? ' Bathrooms' : ' Bathroom') + '</div>' + '</div>' +
            '<div class="user"><b>Owner: </b>' + person_first_name + ' ' + person_last_name + '</div>' +
            '<div class="description">' + place.description + '</div>' +
            '</article>'


            )
        });

      }
    }
  });
});

/*
  <article>
	  <div class="title_box">
	    <h2>PLACENAME</h2>
	    <div class="price_by_night">$PRICEPERNIGHT</div>
	  </div>
	  <div class="information">
	    <div class="max_guest">MAXGUEST GuestADDS)</div>
        <div class="number_rooms">NUMROOMS BedroomADDS</div>
        <div class="number_bathrooms">{{ place.number_bathrooms }} Bathroom{% if place.number_bathrooms != 1 %}s{% endif %}</div>
	  </div>
	  <div class="user">
            <b>Owner:</b> {{ place.user.first_name }} {{ place.user.last_name }}
          </div>
          <div class="description">
          </div>
	</article>
    */

    // IP:PORT/users/<user_id>
