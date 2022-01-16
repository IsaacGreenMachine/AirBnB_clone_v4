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
});
