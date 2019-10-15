// Just wrappers for the http requests required to make API magic work
const headers = {
    'X-TBA-Auth-Key':tbaApiKey
}

function getTeam(team=teamId) {
    return new Promise((resolve, reject) => {
        fetch(apiBaseUrl+'/team/'+teamId, 
        { headers: headers })
        .then(res => res.json())
        .then(json => {
            console.debug(json);
            if (json.hasOwnProperty('Errors')) return reject(json);
            return resolve(json);
        }).catch(err => reject(err));
    });
}

function getEvents(year = 0) {
    return new Promise((resolve, reject) => {
        year = (year===0) ? '':'/'+year;
        fetch(apiBaseUrl+'/team/'+teamId+'/events'+year, 
        { headers: headers })
        .then(res => res.json())
        .then(json => {
            console.debug(json);
            if (json.hasOwnProperty('Errors')) return reject(json);
            return resolve(json);
        }).catch(err => reject(err));
    });
}

function getEvent(event=eventId) {
    return new Promise((resolve, reject) => {
        fetch(apiBaseUrl+'/event/'+event, 
        { headers: headers })
        .then(res => res.json())
        .then(json => {
            console.debug(json);
            if (json.hasOwnProperty('Errors')) return reject(json);
            return resolve(json);
        }).catch(err => reject(err));
    });
}

function getMatches(event=eventId) {
    return new Promise((resolve, reject) => {
        fetch(apiBaseUrl+'/team/'+teamId+'/event/'+event+'/matches/simple', 
        { headers: headers })
        .then(res => res.json())
        .then(json => {
            console.debug(json);
            if (json.hasOwnProperty('Errors')) return reject(json);
            return resolve(json);
        }).catch(err => reject(err));
    });
}

function getAllMatches(event=eventId) {
    return new Promise((resolve, reject) => {
        fetch(apiBaseUrl+'/event/'+event+'/matches/simple', 
        { headers: headers })
        .then(res => res.json())
        .then(json => {
            console.debug(json);
            if (json.hasOwnProperty('Errors')) return reject(json);
            return resolve(json);
        }).catch(err => reject(err));
    });
}

function getMatch(match, event=eventId) {
    // TODO
}

function getStats(event=eventId) {
    return new Promise((resolve, reject) => {
        fetch(apiBaseUrl+'/team/'+teamId+'/event/'+event+'/status', 
        { headers: headers })
        .then(res => res.json())
        .then(json => {
            console.debug(json);
            if (json.hasOwnProperty('Errors')) return reject(json);
            return resolve(json);
        }).catch(err => reject(err));
    });
}