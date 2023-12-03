//Getting the HTML Elements

const hrs = document.getElementById("hoursInput");
const mins = document.getElementById("minutesInput");
const secs = document.getElementById("secondsInput");
const set = document.getElementById("set");
const timersContainer = document.querySelector(".timersContainer");
const stopSound = document.getElementById("audio");


// If no timer present , display that are no timers present
function noTimerCheck(){
    if(timersContainer.childElementCount == 0){
        const noTimerMsg = document.createElement("p");
        noTimerMsg.textContent = "You have no timers currently!";
        document.querySelector(".noTimer").appendChild(noTimerMsg);
    }
    else {
        document.querySelector(".noTimer").innerHTML = "";
    }
}

noTimerCheck();

set.addEventListener('click', () => {
    const hours = parseInt(hrs.value) || 0;
    const minutes = parseInt(mins.value) || 0;
    const seconds = parseInt(secs.value) || 0;

    // Total time in seconds 
    let totalTimeInSec = hours * 3600 + minutes * 60 + seconds;
    
    // Count the given time
    const timerElement = document.createElement("div");
    timerElement.classList.add("timerElementCount");
    let text = document.createElement("p");
    text.innerText = "Time Left: ";
    let p = document.createElement("p");
    p.textContent = formatTime(hours, minutes, seconds);

    // Delete button 
    const deleteButton = document.createElement('button');
    deleteButton.classList.add("deleteBtn");
    deleteButton.textContent = "Delete";
    deleteButton.addEventListener('click', ()=> {
        timerElement.remove(text,timerElement,deleteButton);
        clearInterval(intervalId);
        noTimerCheck();
    });

    
    // Append the timer element to the timers container 
    timerElement.append(text,p,deleteButton);
    timersContainer.append(timerElement);
   
    noTimerCheck();

    // Start the timer using setInterval
    const intervalId = setInterval( ()=> {
        if(totalTimeInSec > 0){
            totalTimeInSec--;

            // update the timer text 
            p.textContent = formatTime(
                Math.floor(totalTimeInSec / 3600),
                Math.floor((totalTimeInSec % 3600) / 60),
                totalTimeInSec % 60
            );
        } else {
            // use this condition if timer has reached 0
            clearInterval(intervalId);
            timerElement.classList.add("isFinished");
            text.textContent = "";
            p.textContent = "Timer is Up !";
            deleteButton.textContent = "Stop";
            // When timer is of play sound 
            stopSound.play();   
        }
    },1000);
    
    deleteButton.addEventListener('click',()=>{
        stopSound.pause();
    });

});

function formatTime(hours,minutes,seconds) {
    return (
        padZero(hours) +' '+' '+':' +' '+' '+
        padZero(minutes) +' '+' '+':'+' '+' '+
        padZero(seconds)
    );
}

// Function used to pad single digit number with a leading zero 
function padZero(num){
    return num < 10 ? '0' + num : num;
}