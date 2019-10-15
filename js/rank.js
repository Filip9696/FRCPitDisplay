function generateRank(update) {
    // Set rank
    let rd = document.getElementById('rank');
    getStats().then(json => {
        if (json.qual === null || json.qual.ranking.rank === null) { // Rank is not null after 1st match is played
            rd.innerHTML = '<i class="material-icons">timer</i> Waiting for event to start';
            return;
        }
        rd.innerHTML = 'Rank '+json.qual.ranking.rank;
    }).catch(err => {
        if (update) {
            if (!rd.innerHTML.includes('offline')) rd.innerHTML += ' <i class="material-icons">offline_bolt</i>';
        } else {
            rd.innerHTML = '<i class="material-icons">error</i> '+err.message;
        }
        console.error(err);
    });
}