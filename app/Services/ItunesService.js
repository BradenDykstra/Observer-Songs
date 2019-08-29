import Song from "../Models/Song.js";

//Private
let _state = {
    apiSongs: [],
    mySongs: []
}

//NOTE methods to run when a given property in state changes
let _subscribers = {
    apiSongs: [],
    mySongs: []
}

// @ts-ignore
let _songApi = axios.create({
    baseURL: 'https://itunes.apple.com/search?callback=?&term='
})

// @ts-ignore
let _sandBox = axios.create({
    baseURL: '//bcw-sandbox.herokuapp.com/api/Braden/songs'
})

function _setState(propName, data) {
    //NOTE add the data to the state
    _state[propName] = data
    //NOTE run every subscriber function that is watching that data
    _subscribers[propName].forEach(fn => fn());
}

//Public
export default class ItunesService {
    get ApiSongs() {
        return _state.apiSongs
    }

    get MySongs() {
        return _state.mySongs
    }

    //NOTE adds the subscriber function to the array based on the property it is watching
    addSubscriber(propName, fn) {
        _subscribers[propName].push(fn)
    }

    getMusicByQuery(query) {
        var url = 'https://itunes.apple.com/search?callback=?&term=' + query;
        // @ts-ignore
        $.getJSON(url)
            .then(res => {
                let results = res.results.map(rawData => new Song(rawData))
                _setState('apiSongs', results)
            })
            .catch(err => console.log(err))
    }

    getPlaylist() {
        _sandBox.get()
            .then(res => {
                console.log(res.data.data)
            })
    }
}
