let TimerDiv = document.getElementById('Timer');
let selectMenu = document.createElement("select");
let hours = 0;
let minutes = 0;
let seconds = 0;
let curentTimeKind = "";
let TimeInterval;
let isIntervalRunning = false;

TimerDiv.appendChild(selectMenu);
selectMenu.id = "menuForTime";
selectMenu.style.visibility = "hidden";

//function that handle which component (hours, minutes, seconds) will be changed
function setTime(timeKind) {
    curentTimeKind = timeKind;
    switch(timeKind) {
        case "hours": setHours();
        break;
        case "minutes": setMinutes();
        break;
        case "seconds": setSeconds();
        break;
        default: console.log("No such option");
    }

    selectMenu.style.visibility = "visible";
    selectMenu.click();
}

function setHours() {
    if(selectMenu.options.length == 0) {
    for(let i = 1; i < 24; i++) {
        let option = document.createElement("option");
        option.value = i;
        option.text = i;
        selectMenu.appendChild(option);
    }
    selectMenu.click();
}
}

function setMinutes() {
    if(selectMenu.options.length == 0) {
        for(let i = 1; i < 60; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.text = i;
            selectMenu.appendChild(option);
        }
        selectMenu.click();
    }
}

function setSeconds() {
    if(selectMenu.options.length == 0) {
        for(let i = 1; i < 60; i++) {
            let option = document.createElement("option");
            option.value = i;
            option.text = i;
            selectMenu.appendChild(option);
        }
        selectMenu.click();
    }
}

//change the text of the button to the selected value from the user
function changeTimer(timeKind, value) {
    switch(timeKind) {
        case "hours": hoursButton.innerHTML = value+"h";
        hours = value;
        break;
        case "minutes": minutesButton.innerHTML = value+"m";
        minutes = value;
        break;
        case "seconds": secondsButton.innerHTML = value+"s";
        seconds = value;
        break;
        default: console.log("No such option");
    }
}

//starts the timer by setInterval function
function onStart() {
    if(hours != 0 || minutes != 0 || seconds != 0) {
        if(!isIntervalRunning) {
            isIntervalRunning = true;
            TimeInterval = setInterval(() => {
                if(seconds != 0) {
                    seconds--;
                    secondsButton.innerHTML = seconds+"s";
                }
                else {
                    seconds = 59;
                    if(minutes > 0) {
                        minutes--;
                        minutesButton.innerHTML = minutes+"m";
                    }
                    else {
                        if(hours > 0) {
                            hours--;
                            minutes = 59;
                            minutesButton.innerHTML = minutes+"m";
                            hoursButton.innerHTML = hours+"h";
                        }
                    }
                    secondsButton.innerHTML = seconds+"s";
                }
        
                if(hours == 0 && minutes == 0 && seconds == 0) {
                    clearInterval(TimeInterval);
                    let finishText = document.createElement("p");
                    finishText.id = "finishText";
                    finishText.innerHTML = "Timer finished";
                    finishText.style.fontSize = "1.2vmax";
                    finishText.style.color = "red";
                    finishText.style.textAlign = "center";
                    finishText.style.textTransform = "uppercase";
                    TimerDiv.appendChild(finishText);
                }
            }, 10)
        }
    }
}

//stops the interval function
function onStop() {
    if(isIntervalRunning) {
        isIntervalRunning = false;
        clearInterval(TimeInterval);
    }
}

//set the timer to all 0 and if it was finished, remove the finished timer text message
function onReset() {
    if(isIntervalRunning) {
        isIntervalRunning = false;
        clearInterval(TimeInterval);
    }

    if(hours == 0 && minutes == 0 && seconds == 0) {
        let text = document.getElementById("finishText");
        text.remove();
        secondsButton.innerHTML = seconds+"0s";
    }
    else {
        hours = 0;
        minutes = 0;
        seconds = 0;

        hoursButton.innerHTML = hours+"0h";
        minutesButton.innerHTML = minutes+"0m";
        secondsButton.innerHTML = seconds+"0s";
    }
}

//Event listeners --------------------------------------------------------------------
selectMenu.addEventListener("change", () => {
    console.log(curentTimeKind+" "+selectMenu.value);
    changeTimer(curentTimeKind, selectMenu.value);
    selectMenu.style.visibility = "hidden";

    for(let i = selectMenu.options.length; i > 0; i--) {
        selectMenu.remove(0);
    } 
    
    curentTimeKind = "";
});


let hoursButton = document.getElementById("hours");
hoursButton.addEventListener("click", () => {setTime("hours");});

let minutesButton = document.getElementById("minutes");
minutesButton.addEventListener("click", () => {setTime("minutes");});

let secondsButton = document.getElementById("seconds");
secondsButton.addEventListener("click", () => {setTime("seconds");});

let startButton = document.getElementById("start");
startButton.addEventListener("click", () => {onStart();});

let stopButton = document.getElementById("stop");
stopButton.addEventListener("click", () => {onStop();});

let resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () => {onReset();});

//----------------------------------------------------------------------------------------
