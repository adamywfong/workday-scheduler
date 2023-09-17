// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
var currentTime = dayjs();
var schedule = $('#scheduleBox');

function init() {
  //Displays current date in header in Day, Month #th format
  var withOrdinal = addOrdinal(currentTime);
  $('#currentDay').text(withOrdinal);
  //Add 9am - 5pm timeblocks to schedule-box
  for (var i = 9; i < 18; i++) {
    makeRow(i);
  }
}

//Adds ordinal to current day's date (e.g. 1-->1st, 2-->2nd, ... , 30-->30th) 
function addOrdinal(dayjsObject) {
  words = dayjsObject.format('dddd, MMMM D').split(' ');
  if (parseInt(words[2],10) > 3 && parseInt(words[2],10) < 21) {
    words[2]+='th';
  } else if (parseInt(words[2],10) % 10 === 1){
    words[2]+='st';
  } else if (parseInt(words[2],10) % 10 === 2){
    words[2]+='nd';
  } else if (parseInt(words[2],10) % 10 === 3){
    words[2]+='rd';
  } else {
    words[2]+='th';
  }
  return words.join(' ');
}

//Generates the timeblock for the hour (number) when (number) is submitted in 0-23 hour format and adds to schedule
function makeRow(number) {
  var textContent = localStorage.getItem('hour'+number);
  var timeBlock = $('<div id="hour' + number + '">');
  timeBlock.addClass("row time-block");
  timeBlock.addClass(checkTime(number));
  var hour = $('<div>');
  hour.addClass("col-2 col-md-1 hour text-center py-3");
  var textArea = $('<textarea rows="3">');
  textArea.addClass("col-8 col-md-10 description");
  textArea.val(textContent);
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

//Saves text of clicked timeBlock to localStorage
function saveText(event) {
  event.preventDefault();
  var clicked = $(event.target);
  var timeBlockClicked = $(clicked.closest('.time-block'));
  console.log($(event.target));
  console.log(timeBlockClicked);
  localStorage.setItem(timeBlockClicked.attr('id'), $(timeBlockClicked).children().eq(1).val());
}

//checkTime function compares number to current time in 24 hour format and returns 'past', 'present', or 'future
function checkTime(number) {
  if (currentTime.$H===number) {
    return 'present';
  } else if (number < currentTime.$H) {
    return 'past';
  } else {
    return 'future';
  }
}

//Event listener checks if save button is clicked
schedule.on('click', '.saveBtn', saveText);

init();