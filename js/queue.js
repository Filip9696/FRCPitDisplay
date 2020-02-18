function generateQueue(update) {
    let qt = document.getElementById('queueTable'); // Word looks mispelled, it's not. Weird words
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
            qt.innerHTML = `
            <tr><td colspan=8><strong id="queuing">Now Queuing Match ${highestMatch+3}</strong></td></tr>
            <tr>
                <th>Match</th>
                <th>ETA</th>
                <th colspan=3>Red Alliance</th>
                <th colspan=3>Blue Alliance</th>
            </tr>`;
            let nextRows = [];
            json = json.filter((value) => {
                return (value.match_number >= highestMatch && value.match_number < highestMatch+3); // Pick the next 3 matches
            });
            json.forEach(match => {
                let r = document.createElement('tr');
                r.classList.add('match');

                let eta = 0;
                if (match.alliances.red.score<0) { // Less than 0 score means the match hasn't played yet
                    eta = (match.match_number-highestMatch)*8; // Basically assuming each match takes 8 minutes
                    if (eta > 59) { // If it's more than 59 minutes, make it pretty with hours
                        if (eta <= resetTime) { // There's that variable from the config, still dk what it does
                            eta = '<4'; // But apparently it means the match is close
                        } else if (eta%60 !== 0) { // If the minute amount is not divisible by 60 with no remainder
                            eta = (eta/60).toString().split('.'); // So convert to hours and remove the decimal
                            eta = eta[0]+'h '+(('0.'+eta[1])*60).toFixed(0)+'m'; // idk what I did here
                        } else { // Divisible by 60, so just do hours not minutes
                            eta = (eta/60)+'h';
                        }
                    } else {
                        eta += 'm'; // Not more than an hour, so just do minutes
                    }
                } else {
                    eta = ''; // Match has a score >0 so it's already been played
                }

                let cols = [
                    match.match_number,
                    eta,
                    match.alliances.red.team_keys[0].replace('frc',''), // Remove frc from team ids because more pretty
                    match.alliances.red.team_keys[1].replace('frc',''),
                    match.alliances.red.team_keys[2].replace('frc',''),
                    match.alliances.blue.team_keys[0].replace('frc',''),
                    match.alliances.blue.team_keys[1].replace('frc',''),
                    match.alliances.blue.team_keys[2].replace('frc','')
                ]

                // Now make it fancy and in HTML
                cols.forEach(col => {
                    let c = document.createElement('td');
                    c.innerHTML = col;
                    if (col === teamId.replace('frc', '')) { // If the column has our team number, than apply the .us class, because we extra spechial
                        c.classList.add('us');
                    }
                    r.appendChild(c); // Add to row
                });
                nextRows.push(r); // Add to table
            });
            nextRows.forEach(r => qt.appendChild(r));
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