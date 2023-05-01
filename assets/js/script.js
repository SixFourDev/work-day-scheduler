$(document).ready(function () {
  var userInput = $(".time-block").val();
});

function userEntry() {
  // Retrieve user input from text area and save to local storage on button click
  $(".saveBtn").on("click", function () {
    // Gets description from "this" sibling 
    var userInput = $(this).siblings(".description").val();
    // Gets id of "this" time-block, which contains the hour value
    var timeBlockId = $(this).closest(".time-block").attr("id");
    // Saves userInput from the timeBlockId to the localStorage
    localStorage.setItem(timeBlockId, userInput);
  });
}
userEntry();

function timeBlockColor() {
  // Creates a variable for now with the current date
  var now = dayjs();
  // Creates a variable for currentHour and gets the day with now, and hour() to get the current hour.
  var currentHour = now.hour();

  // Selects the class "time-block, and uses the each method to iterate over each of them"
  $(".time-block").each(function () {
    // Gets id from the current "time-block" element by using split to take away the dash
    // in hour, and selecting the hour part. parseInt is used to convert the hour string to an integer.
    var blockHour = parseInt(this.id.split("-")[1]);
    // "this" line toggles the class "past" on the current time block and sets it less than the current hour
    $(this).toggleClass('past', blockHour < currentHour);
    // "this" line toggles the class "present" on the current time block and is equal to the current hour
    $(this).toggleClass('present', blockHour === currentHour);
    // "this" line toggles the "future" on the current tike block and is greater than the current hour
    $(this).toggleClass('future', blockHour > currentHour);
  });
}
// Calls the timeBlockColor function
timeBlockColor();


function getSavedUserInput() {
  // Loop through each time-block
  $(".time-block").each(function () {
    // Get the id of the current time-block
    var timeBlockId = $(this).attr("id");
    // Get the saved user input from localStorage for the current time-block id
    var savedUserInput = localStorage.getItem(timeBlockId);
    // If savedUserInput exists, find in "this" description and set value to savedUserInput
    if (savedUserInput) {
      $(this).find(".description").val(savedUserInput);
    }
  });
}
// Call the function to get any saved user input on page load
getSavedUserInput();

// This function displays the current date and time in the header of the webpage
function updateTime() {
  // Creates the date and time variables and grabs them by id 
  var dateElement = $('#date');
  var timeElement = $('#time');
  // Used dayjs to get current date and time
  var currentDate = dayjs().format('dddd, MMMM D, YYYY');
  var currentTime = dayjs().format('hh:mm:ss A');
  // Passes currentDate and currentTime to display in date and time Elements
  dateElement.text(currentDate);
  timeElement.text(currentTime);
}
// Sets interval to updateTime every 1 second
setInterval(updateTime, 1000);

