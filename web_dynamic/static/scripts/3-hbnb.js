//http://0.0.0.0:5001/api/v1/status/
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
    $.post({url: 'http://127.0.0.1:5001/api/v1/places_search/', data: {}, /*type: 'POST',*/ dataType: 'application/json', success: function(data) {
        for (let i = 0; i < data.length; i++) {
        console.log(data[i])
        }
    }})
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
