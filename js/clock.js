function generateClock() {
    // Set clock
    let td = document.getElementById('time-display');
    let now = new Date(); // Get current time and seperate into hours+minutes
    let hour = now.getHours();
    let min = now.getMinutes();
    if (min < 10) min = '0'+min; // Add zero padding if minute count is 0-9
    td.innerHTML = '<i class="material-icons">access_time</i> '; // Fancy icon, because I used to be fancy like that
    if (hour === 0 || hour === 12) { // Because there's no such thing as 24 o'clock I guess, just wraps to 0
        td.innerHTML += '12:'+min+((hour>0)?' pm':' am'); // IMO 24 hours clocks > 12 hour clocks, but I'm european so you know, metric an all that
    } else if (hour > 12) {
        td.innerHTML += (hour-12)+':'+min+' pm'; // 12 hour clock conversion for the "normies"
    } else {
        td.innerHTML += hour+':'+min+' am';
    }
}