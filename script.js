//calling Add function by enter key  
var input = document.getElementById("myinput");

input.addEventListener("keypress", function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById("addbtn").click();
    }
});

// or we can call like this by using key code  (enter key code is 13 )

var datetime_ip = document.getElementById("datetime");
datetime_ip.addEventListener("keyup", function (event) {
    if (event.keyCode === 13) {
        event.preventDefault();
        document.getElementById("addbtn").click();
    }
});


//calling funtions which is needed on page load 
window.addEventListener('load', (event) => {
    liveTime();
   
})

//declaring global index to maintain id for multiple list
let index = 0;
var mysecond = 0;
let arr_second = [0];
let arr_input = [""];


// main funtion to add task in list
function Add() {
    let myinput = document.getElementById('myinput').value;
    let date_time = document.getElementById('datetime').value;
    let date = new Date(date_time);
    // console.log(Date.parse(date_time));   //1627151460000
    // console.log(dateManage(date));        // Sun Jul 25 2021 00:06:00 GMT+0530 (India Standard Time)

    // console.log(timeDiff(date));

    // countDown(date);
    timeDiff(date); // it print remaining time in second...and it will store the balue in mysecond global variable

    if (mysecond <= 0) {
        swal("wrong date time selection", "you are tring to add past date time. \n please add future date and time ", "warning", {
            button: "Ok",
        });
        return;
    }

    mysecond = 0;
    index = index + 1;

    // console.log(arr_second[index]);

    if (myinput === "") {
        // alert("Please write something");
        swal("Input Can't  empty", "Please write something", "warning", {
            button: "Ok",
        });
    } else if (date_time === "") {
        swal("Date time can't  empty", "Please select date and time", "warning", {
            button: "Ok",
        });
    } else {
        arr_input.push(myinput);
        var outputbox = document.getElementById('outputbox');
        outputbox.style.display = 'block';
        var ul = document.getElementById('list');
        var li = document.createElement('li');
        //   console.log("index of add fun"+index);
        li.innerHTML = `${myinput} <p class="datetime_para"> <i class="far fa-clock"></i> <span class="__htext"> Due till : </span> ${dateManage(date)} </p>  
        <p id="time_left${index}" class="timeleft_para">  ${countDown(date, index)}</p>
        <div id="progressbar${index}"></div>
        `;

        var i = document.createElement('i');
        i.className = 'far fa-trash-alt mytrash';
        i.onclick = function () {
            removeItem();
        }
        li.append(i);
        ul.append(li);
        outputbox.append(ul);

        // console.log(index);

        // console.log("mysecond  " + mysecond);
        // console.log(arr_second);
        // console.log(arr_input);

        //calling progress bar funtion after saving it all 
        createProgressbar(`progressbar${index}`, `${arr_second[index]}s`);
        createProgressbar(`progressbar${index}`, `${arr_second[index]}s`, function () {
            //removing progress bar if time in second is 0
            document.getElementById(`progressbar${index}`).style.display = "none";
        });

        reset();
        swal("Good Job !", "task added to list", "success", {
            button: "Ok",
        });
    }

}


//task coundown funtion 

function countDown(countDownDate, index) {

    var countDownDate = countDownDate.getTime();

    // Update the count down every 1 second
    var x = setInterval(function () {

        // Get today's date and time
        var now = new Date().getTime();

        // Find the distance between now and the count down date
        var distance = countDownDate - now;

        // Time calculations for days, hours, minutes and seconds
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Output the result in an element with id="demo"
        id = "time_left" + index;
        //   console.log("index of timer func"+index);
        document.getElementById(`${id}`).innerHTML = '<i class="far fa-hourglass"></i> ' + " " + days + "d " + hours + "h " + minutes + "m " + seconds + "s ";

        // If the count down is over, write some text 
        if (distance < 0) {
            clearInterval(x);
            swal({
                title: "Time over ",
                text: `For task   : ${arr_input[index]}`,
            });
            document.getElementById(`${id}`).innerHTML = "DUE TIME EXPIRED";
        }
    }, 1000);
}


// to reset input fields 
function reset() {
    document.getElementById('myinput').value = "";
    document.getElementById('datetime').value = "";
}


//remove task from list
function removeItem() {
    var trash = document.getElementsByClassName('mytrash');
    for (var i = 0; i < trash.length; i++) {
        trash[i].onclick = function () {
            var div = this.parentElement;
            div.style.display = "none";
        }
    }
}


//date manage for return   date and time 
function dateManage(dateArg) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    let year = dateArg.getFullYear();
    let month = months[dateArg.getMonth()];
    let date = dateArg.getDate();
    let day = days[dateArg.getDay()];
    let hour = addZero(dateArg.getHours());
    let minute = addZero(dateArg.getMinutes());

    // console.log(year+" "+date+" "+day+" "+month+" "+hour+" "+minute);
    return `${date} ${month} (${day}) , ${year} at  ${hour}:${minute}`
}

// funtion to add zero if hour and minute less than 10
function addZero(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function timeDiff(endDate) {
    var startDate = new Date();
    var seconds = (endDate.getTime() - startDate.getTime()) / 1000;   //diving 1000 because this time is in milisecond before
    mysecond = seconds;
    arr_second.push(mysecond);

    // return convertSecToDay(seconds);
}

function liveTime() {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    let date = new Date();
    let h = addZero(date.getHours());
    let m = addZero(date.getMinutes());
    let s = addZero(date.getSeconds());
    let clock = `${h}:${m}:${s}`;
    document.getElementById('live_time').innerHTML = `${clock}`;
    // console.log(clock);
    let curr_date = date.getDate();
    let month = months[date.getMonth()];
    let year = date.getFullYear();
    let day = days[date.getDay()];
    let live_date = `${curr_date},${month},${year}`;
    document.getElementById('live_date').innerHTML = `${live_date}`;
    document.getElementById('live_day').innerHTML = `${day}`;
    setTimeout(liveTime, 1000);
}



function createProgressbar(id, duration, callback) {

    // console.log(id)
    // We select the div that we want to turn into a progressbar
    var progressbar = document.getElementById(id);
    progressbar.className = 'progressbar';

    // We create the div that changes width to show progress
    var progressbarinner = document.createElement('div');
    progressbarinner.className = 'inner';

    // Now we set the animation parameters
    progressbarinner.style.animationDuration = duration;

    // Eventually couple a callback
    if (typeof (callback) === 'function') {
        progressbarinner.addEventListener('animationend', callback);
    }

    // Append the progressbar to the main progressbardiv
    progressbar.appendChild(progressbarinner);

    // When everything is set up we start the animation
    progressbarinner.style.animationPlayState = 'running';
}
