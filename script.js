// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.

var currentTime = dayjs();
var schedule = $('#scheduleBox');

$(function () {
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  //
  // TODO: Add code to apply the past, present, or future class to each time
  // block by comparing the id to the current hour. HINTS: How can the id
  // attribute of each time-block be used to conditionally add or remove the
  // past, present, and future classes? How can Day.js be used to get the
  // current hour in 24-hour time?
  //
  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  //
  // TODO: Add code to display the current date in the header of the page.
});


//checkTime function compares number to current time in 24:00 format and returns 'past', 'present', or 'future
function checkTime(number) {
  if (currentTime.$H===number) {
    return 'present';
  } else if (number < currentTime.$H) {
    return 'past';
  } else {
    return 'future';
  }
}

function makeRow(number) {
  //textContent = localStorage.getItem('hour-'+number);
  var textContent = 'get from local storage';
  var timeBlock = $('<div>').addClass("row time-block")
  timeBlock.addClass(checkTime(number));
  var hour = $('<div>').addClass("col-2 col-md-1 hour text-center py-3");
  var textArea = $('<textarea rows="3">').addClass("col-8 col-md-10 description");
  textArea.text(textContent);
  if (number < 12) {
    hour.text(number + "AM");
  } else if (number === 12) {
    hour.text('12PM') ;
  } else {
    hour.text(number%12+'PM');
  }
  timeBlock.append(hour);
  timeBlock.append(textArea);
  timeBlock.append('<button class="btn saveBtn col-2 col-md-1" aria-label="save">'+
       '<i class="fas fa-save" aria-hidden="true"></i>'+
       '</button>');
  schedule.append(timeBlock);
}

function init() {
  //Displays current day in Day, Month # format
  $('#currentDay').text(currentTime.format('dddd, MMMM D'));
  //Add 9am - 5pm to schedule-box
  for (var i = 9; i < 18; i++) {
    makeRow(i);
  }
}

init();
