function generateQueue(update) {
    let qd = document.getElementById('queuing'); // Word looks mispelled, it's not. Weird words
    getAllMatches().then(json => {
        let highestMatch = 0;
        json.forEach(match => { // We're finding the highest match again, kinda inefficant, kinda don't care
            if (match.winning_alliance !== '' && highestMatch < match.match_number) {
                highestMatch = match.match_number;
            }
        });
        if (highestMatch === 0) { // Haven't started yet
            getStats().then(stats => {
                if (stats.qual.ranking.rank === null) { // Apparently ranking is null once the event kickoff happens
                    qd.innerHTML = 'Now Queuing Match 1';
                } else {
                    qd.innerHTML = '<i class="material-icons">timer</i> Waiting for event to start'
                }
            });
        } else {
            qd.innerHTML = 'Now Queuing Match '+(highestMatch+3); // Maybe make this configurable? nah.
        }
    }).catch(err => {
        if (update) {
            if (!qd.innerHTML.includes('offline')) rd.innerHTML += ' <i class="material-icons">offline_bolt</i>';
        } else {
            qd.innerHTML = '<i class="material-icons">error</i> '+err.message;
        }
        console.error(err);
    });
}