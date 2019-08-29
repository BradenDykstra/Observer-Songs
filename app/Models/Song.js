export default class Song {
    constructor(data) {
        this.title = data.trackName
        this.albumArt = data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300")
        this.artist = data.artistName
        this.collection = data.collectionName
        this.price = data.trackPrice
        this.preview = data.previewUrl
        this.user = data.user
    }

    get Template() {
        let template = `
        <div class="card p-3 mb-3">
        <img class="card-img-top " src="${this.albumArt}" alt="Card image cap">
        <div class="card-body">
            <h5 class="card-title">${this.title}</h5>
            <p class="card-text">${this.collection}. Price: ${this.price}</p>
            <audio controls src="${this.preview}"></audio>
        </div>
    
        `
        if (this.user) {
            template += `<button class='btn btn-outline-danger'><i class='fa fa-minus'></i></button>`
        } else {
            template += `<button class='btn btn-outline-success' onclick='app.controllers.itunesController.addSong("${this.title}")'><i class='fa fa-plus'></i></button>`
        }
        template += `</div>`

        return template
    }
}