const params = new URLSearchParams(location.search)
console.log(params)
let id = params.get("id")

let album_endpoint = "https://striveschool-api.herokuapp.com/api/deezer/album/" + id;

const getDataAl = async () => {
    const response = await fetch(album_endpoint);
    const data = await response.json();
    return data;
};

getDataAl().then(data => {
    //console.log(data.tracks.data)
    const IMGO = document.querySelector(".fuerte img")
    const IMGT = document.querySelector(".fuerte li img")
    const HEADI = document.getElementById("albumTitle")
    const HEAD = document.querySelector(".fuerte li h6")
    const HEA = document.querySelector(".fuerte li p")
    IMGO.src = `${data.cover_medium}`
    IMGT.src = `${data.artist.picture_small}`
    HEADI.innerText = `${data.title}`
    HEAD.innerText = `${data.artist.name}`
    HEA.innerText = `${data.nb_tracks}` + " tracks"

    for(index of data.tracks.data) {
        console.log(index)
    }
})