/* Set the clock to the current time */

function setCurrentTime() {

    var date = new Date();

    var hours = date.getHours() % 12;
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();

    var hoursHand = document.getElementById("hours-hand");
    hoursHand.style.animationDelay = - ((hours * 3600) + (minutes * 60) + seconds) + "s";

    var minutesHand = document.getElementById("minutes-hand");
    minutesHand.style.animationDelay = - ((minutes * 60) + seconds) + "s";

    var secondsHand = document.getElementById("seconds-hand");
    secondsHand.style.animationDelay = -seconds + "s";

}

function ready(fn) {
    if (document.readyState != 'loading') {
        fn();
    } else {
        document.addEventListener('DOMContentLoaded', fn);
    }
}

ready(setCurrentTime);

