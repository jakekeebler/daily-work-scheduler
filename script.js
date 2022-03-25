$(document).ready(function() {

    // Puts current date on the jumbotron
    $("#currentDay").text(moment().format("MMMM Do YYYY"));
    
    
    var description = $(".description");
    var saveButton = $(".saveBtn");
    var currentHour = moment().hour();
    
    // Color coding for time blocks
    description.each(function () {
        var timeBlock = parseInt($(this).attr("id"));
    
        if (timeBlock === currentHour) {
            $(this).addClass("present");
            $(this).removeClass("future");
            $(this).removeClass("past");
        }
        else if (timeBlock < currentHour) {
            $(this).addClass("past");
            $(this).removeClass("future");
            $(this).removeClass("present");
        }
        else {
            $(this).addClass("future");
            $(this).removeClass("past");
            $(this).removeClass("present");
        }
    });
    
    // Grabs tasks from localStorage
    
    description.each(function() {
    
        for (var i = 0; i < localStorage.length; i++) {
            var objectKey = localStorage.key(i);
            var taskValue = localStorage.getItem(objectKey);
            var rowHour = $(this).siblings(".hour").text();
           
            if (objectKey === rowHour) {
                $(this).val(taskValue);
            }
           
        }
    });
    
    // Saves task to localStorage
    function saveTasks () {
        var currentTime = $(this).data("hour");
        var rowHour = $(this).siblings(".hour").text();
        var task = $(this).siblings(".description").val();
    
        if (task === "") {
            localStorage.setItem(rowHour, "");
        }
        else {
            localStorage.setItem(rowHour, task);
        }
    }
    
    saveButton.on("click", saveTasks);
    
    });