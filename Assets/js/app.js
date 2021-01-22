var container = $('.container');
var descriptions = new Array(9);

var createTimeColumn = function (hour) {
  var unit;
  var displayHour;
  hour < 12 ? (unit = 'AM') : (unit = 'PM');
  hour > 12 ? (displayHour = hour - 12) : (displayHour = hour);

  var colHour = $('<div>')
    .addClass('col-1 hour')
    .text(displayHour + unit);

  return colHour;
};

var createDescriptionColumn = function (hour) {
  var colDesc = $('<div>').addClass('col-10 description').append($('<textarea>').attr('data-hour', hour));

  var presentHour = +moment().format('H');
  // var presentHour = 12;  // for testing

  if (hour < presentHour) {
    colDesc.addClass('past');
  } else if (hour === presentHour) {
    colDesc.addClass('present');
  } else if (hour > presentHour) {
    colDesc.addClass('future');
  }

  return colDesc;
};

var createSaveColumn = function (hour) {
  var colSave = $('<div>').addClass('col-1 saveBtn').html(`<i class="fas fa-save" data-hour=${hour}></i>`);

  return colSave;
};

var createRow = function (hour) {
  var div = $('<div>').addClass('row');

  var colHour = createTimeColumn(hour);
  var colDesc = createDescriptionColumn(hour);
  var colSave = createSaveColumn(hour);

  div.append(colHour).append(colDesc).append(colSave);
  return div;
};

for (var hour = 9; hour <= 17; hour++) {
  container.append(createRow(hour));
}

$('.container').on('click', 'i', function () {
  var dataHour = $(this).attr('data-hour');
  var jqueryThis = $(this);
  var arrayIndex = dataHour - 9;
  descriptions[arrayIndex] = $(`textarea[data-hour=${dataHour}]`).val().trim();
});
