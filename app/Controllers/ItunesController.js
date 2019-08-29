import ItunesService from "../Services/ItunesService.js";

//Private
let _itunesService = new ItunesService()

function _drawApiSongs() {
    let elem = document.getElementById('songs')
    let songs = _itunesService.ApiSongs
    let template = `<ul>`
    songs.forEach(s => {
        template += s.Template
    })
    elem.innerHTML = template + '</ul>'
}

function _drawMySongs() {
    let elem = document.getElementById('playlist')
    let songs = _itunesService.MySongs
    let template = `<ul>`
    songs.forEach(s => {
        template += s.Template
    })
    elem.innerHTML = template + '</ul>'
}

//Public
export default class ItunesController {
    constructor() {
        //NOTE Register all subscribers
        _itunesService.addSubscriber("apiSongs", _drawApiSongs)
        _itunesService.addSubscriber("mySongs", _drawMySongs)

        //NOTE Retrieve data
        _itunesService.getMusicByQuery('')
        _itunesService.getPlaylist()
    }

    search(e) {
        e.preventDefault();
        _itunesService.getMusicByQuery(e.target.query.value)
    }
}