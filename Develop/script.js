$(function () {
  function hourAmPm(hour) {
    if (hour === 0) {
      return "12AM";
    } else if (hour === 12) {
      return "12PM";
    } else if (hour < 12) {
      return hour + "AM";
    } else {
      return (hour - 12) + "PM";
    }
  }
  var currentTime = dayjs().hour();
  function colorTime(startingTime) {

    var convertedTime = hourAmPm(startingTime);
    var scheduleBlock = $("<section></section>");
    if (currentTime > startingTime) {
      scheduleBlock.addClass("past");
    }
    if (currentTime === startingTime) {
      scheduleBlock.addClass("present");
    }
    if (currentTime < startingTime) {
  
      scheduleBlock.addClass("future");
    }
    var blockId = "hour-" + startingTime;
    scheduleBlock.addClass("row time-block");
    scheduleBlock.attr("id", blockId);
    $(".container-lg").append(scheduleBlock);

    var calendarTime = $("<section></section>");
    calendarTime.addClass("col-2 col-md-1 hour text-center py-3")
    calendarTime.text(convertedTime);
    scheduleBlock.append(calendarTime);

    var calendarTask = $("<textarea></textarea>");
    calendarTask.addClass("col-8 col-md-10 description");
    calendarTask.attr("rows", "3");
    scheduleBlock.append(calendarTask);

    var calendarSave = $("<button></button>");
    calendarSave.addClass("btn saveBtn col-2 col-md-1");
    calendarSave.attr("aria-label", "save");
    scheduleBlock.append(calendarSave);

    var saveAnimation = $("<i></i>");
    saveAnimation.addClass("fas fa-save");
    saveAnimation.attr("aria-hidden", "true");
    calendarSave.append(saveAnimation);

    startingTime++;
  }

  for (let i = 9; i <= 17; i++) {
    colorTime(i);
  }

  var saveMessageDisplayed = false;

  function displaySaveNotification(message) {
    if (!saveMessageDisplayed) {
      var saveNotification = $("<section></section>");
      saveNotification.addClass("save-message text-center");
      saveNotification.text(message);
      $(".container-lg").prepend(saveNotification);
      saveMessageDisplayed = true;
    }
  }

  $(".btn").on("click", function () {

    displaySaveNotification("Appointment Added to localstorage")
    console.log("Button Clicked");

    var timeBlock = $(this).parent().attr("id");
    console.log("time: ", timeBlock);

    var userTask = $(this).prev().val();
    console.log(userTask)

 
    function storeTasks(workTime, workTask) {
      var savedSchedule = JSON.parse(localStorage.getItem("savedSchedule")) || [];

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
  
    var savedSchedule = JSON.parse(localStorage.getItem("savedSchedule")) || [];


    savedSchedule.forEach(function (task) {
      var textarea = $("#" + task.workTime).find("textarea");
      textarea.val(task.workTask);
    });
  });



  var currentDate = dayjs().format("dddd, MMMM DD");

  $("#currentDay").text(currentDate);

});