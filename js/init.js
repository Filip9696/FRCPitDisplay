function startStream(event=eventId, volume=0.5) {
    return new Promise((resolve, reject) => { // I promise I'll get the live stream to work!
        let playerElm = document.getElementById('player');
        getEvent(event).then(json => {
            var options = {
                width: '100%', // Should fill the container 100% of the time
                height: '100%',
                channel: json.webcasts[0].channel // I feel like there should be handling if there are no webcasts... But I like to live dangerously
            };
            try {
                var player = new Twitch.Player('player', options); // Class Action Magic
                player.setVolume(volume); // IDK if this is required, but it was in the example in the documentation, so yeah I guess
                resolve(); // Okay, I fulfilled my promise
            } catch (err) {
                playerElm.innerHTML = '<h2><i class="material-icons">error</i> '+err.message+'</h2>';
                console.error(err);
                reject(err); // I don't keep my promises
            }
        }).catch(err => {
            playerElm.innerHTML = '<h2><i class="material-icons">error</i> '+err.message+'</h2>';
            console.error(err);
            reject(err); // I didn't even have a chance to try...
        });;
    });
}

function generateDisplay(update=false) {
    // Set name
    if (!update) { // We don't need to update the team name every 15 seconds
        let tnd = document.getElementById('team');
        getTeam().then(json => { // Why set the team name in config when you can waste an HTTP request?
            tnd.innerHTML = json.nickname+' #'+json.team_number
        }).catch(err => {
            tnd.innerHTML = teamId;
            console.error(err);
        });
    }
    
    // Bask in glory as everything definetly works first try
    generateClock();
    generateRank(update);
    generateMatches(update);
    generateQueue(update);
}

function updateLoop(interval=updateRate, update=false) {
    console.log('Updating data');
    generateDisplay(update);
    setTimeout(() => { updateLoop(interval, true) }, interval*1000); // I'd drop a Mr. Kurecka recursion meme, but I'd rather not rn
}

document.addEventListener('DOMContentLoaded', function() {
    let elems = document.querySelectorAll('select');
    M.FormSelect.init(elems, {}); // Init all the things! Including the selectors which are WIP right now
});

startStream();
updateLoop();
