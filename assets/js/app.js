$(document).ready(function () {
  var container = $('.container');
  var descriptions = new Array(9); // Used to keep track of entered text

  // ! ------------------------------------------------------
  // ! 1.) Assigning current day to the top of the calendar
  // ! ------------------------------------------------------
  $('#currentDay').text(moment().format('dddd, MMMM Do, YYYY'));

  // ! ------------------------------------------------------
  // ! 2.) Creating HTML / View Programmatically
  // !       a.) Time Column
  // !       b.) Description Column
  // !       c.) Save Button Column
  // ! ------------------------------------------------------
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
    descriptions = JSON.parse(localStorage.getItem('descriptions')) || new Array(9);

    var textArea = $('<textarea>')
      .attr('data-hour', hour)
      .text(descriptions[hour - 9]);

    var colDesc = $('<div>').addClass('col-10 description').append(textArea);

    var presentHour = +moment().format('H');
    // var presentHour = 12; // for testing

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

  var createView = function () {
    for (var hour = 9; hour <= 17; hour++) {
      container.append(createRow(hour));
    }
  };

  createView();

  // ! ------------------------------------------------------
  // ! 3.) Handle click events on Save Icons
  // ! ------------------------------------------------------
  $('.container').on('click', 'i', function () {
    var dataHour = $(this).attr('data-hour');
    var arrayIndex = dataHour - 9;
    descriptions[arrayIndex] = $(`textarea[data-hour=${dataHour}]`).val().trim();

    localStorage.setItem('descriptions', JSON.stringify(descriptions));
  });
});
