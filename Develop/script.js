$(function () {
  // Display current date
  //click event to save user input to local storage
  clickeventbutton = $(".saveBtn").on("click", function () {
    var time = $(this).parent().attr("id");
    var text = $(this).siblings(".description").val();
    localStorage.setItem(time, text);
  }
  );

  function hourAMPM(hour) {
    if (hour === 0) {
      return "12AM";
    } else if (hour === 12) {
     return "12PM";
    } else if  (hour < 12) {
      return hour + "AM";
    } else {
      return (hour - 12) + "PM";
    }
  }



  function colorTime(startingTime){

    var convertedTime = hourAMPM(startingTime);

    var scheduleBlock = $("<section></section>");

    if (currentTime > startingTime){
      // Make color green
      scheduleBlock.addClass("past");
    }

    if (currentTime === startingTime){
      // Make color red
       scheduleBlock.addClass("present");
    }
    
    if (currentTime < startingTime){
      // Make color grey
      scheduleBlock.addClass("future");
    }
    
    var BlockId = "hour -" + startingTime;
    scheduleBlock.addClass("row time-block");
    scheduleBlock.attr("id", BlockId);
    $(".container-lg").append(scheduleBlock);

    varcalenderTime = $("<section></section>");
    scheduleBlock.append(calenderTime);
    calenderTime.text(convertedTime);
    calenderTime.addClass("col-2 col-md-1 hour text-center py-3");

    var calenderTask = $("<textares></textares>");
    scheduleBlock.append(calenderTask);
    calenderTask.text("convertTime");
    calenderTask.addClass("btn saveBtn col-2 col-md-1");

    var calendarSave = $("<button></button>");
    calendarSave.attr("aria-label", "save");
    calendarSave.addClass("btn saveBtn col-2 col-md-1");
    calendarBlock.append(calendarSave);

    var saveAnimation = $("<i></i>");
    saveAnimation.addClass("fas fa-save");
    calendarSave.append(saveAnimation);
    saveAnimation.attr("aria-hidden", "true");

    startingTime++;

  }

  var saveMessageDisplayed = false;

  for (let i = 9; i <= 17; i++) {
    colorTime(i);
  };

  function displaySaveNotication(message) {
    if (!saveMessageDisplayed) {
      var saveNotification = $("<section></section>");
      saveNotification.addClass("save-message text-center");
      saveNotification.text(message);
      $(".container-lg").prepand(saveNotification);
      saveMessageDisplayed = true;
    }
  }

  $(".btn").on("click", function () {

    displaySaveNotication("Appointments Added to lcoalstorage");
    console.log("button clicked");
    
    var timeBlock = $(this).parent().attr("id");
    console.log("time: ", timeBlock);

    var userTask = $(this).prev().val();
    console.log(userTask);

    function storeTasks(timeBlock, userTask){
      var savedSchedule = JSON.parse(localStorage.getItem("savedSchedule")) || {};

      var newTask = {
        workTime: timeBlock,
        workTask: userTask
      };
      
      savedSchedule.push(newTask);

      localStorage.setItem("savedSchedule", JSON.stringify(savedSchedule));
    }

    storeTasks(timeBlock, userTask);

  });

  $(document).ready(function () {
    var savedschedule = JSON.parse(localStorage.getItem("savedSchedule")) || [];
    
    savedschedule.forEach(function (task) {
      var textarea = $("#" + task.workTime).find("textarea");
      textarea.val(task.workTask);
    });
  });

  function displayHour() {
    $("#currenthour").text(currentHour);
  }
  
  displayHour();

  // function to color code time blocks
  function colorTime(hour) {
    if (hour < currentTime) {
      $("#" + hour).addClass("past");
    } else if (hour === currentTime) {
      $("#" + hour).addClass("present");
    } else {
      $("#" + hour).addClass("future");
    }
  }
  var currentTime = dayjs().hour(); 
  colorTime(currentTime);
  var currentHour = dayjs().hour();

  // display current date
  $('#currentDay').text(dayjs().format('dddd, MMMM D, YYYY'));

});
