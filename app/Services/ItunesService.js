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
    baseURL: '//itunes.apple.com/search?callback=?&term='
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
        return _state.mySongs.map(s => new Song(s))
    }

    //NOTE adds the subscriber function to the array based on the property it is watching
    addSubscriber(propName, fn) {
        _subscribers[propName].push(fn)
    }

    getMusicByQuery(query) {
        var url = '//itunes.apple.com/search?callback=?&term=' + query;
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
                _setState('mySongs', res.data.data)
            })
    }

    addSong(title) {
        let song = _state.apiSongs.find(s => s.title == title)
        _sandBox.post('', song)
            .then(res => {
                _state.mySongs.push(new Song(res.data.data))
                _setState('mySongs', _state.mySongs)
            })
            .catch(err => {
                console.error(err)
            })
    }
}
