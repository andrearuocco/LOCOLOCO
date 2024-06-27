const params = new URLSearchParams(location.search)
console.log(params)
let id = params.get("id")

let album_endpoint = "https://striveschool-api.herokuapp.com/api/deezer/album/" + id;

const getDataAl = async () => {
    const response = await fetch(album_endpoint);
    const data = await response.json();
    return data;
};

function play(attributes) {
    console.log(attributes)
    const AUDIO = document.querySelector("source")
    const PLAY = document.getElementById("audio")
    AUDIO.src = `${attributes}`
    PLAY.load()
    const ICON = document.querySelector("#none i")
    ICON.classList.add("d-none")
    PLAY.classList.remove("d-none")
}

let dataName = ""
getDataAl().then(data => {
    //console.log(data.tracks.data)
    dataName = data.artist.name
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

    const ALBUM = document.querySelector(".album")
    for(index of data.tracks.data) {
        //console.log(index.preview)
        ALBUM.innerHTML += `
        <div id='tracks' class='d-flex justify-content-between me-4 mb-2'>
            <ul class='d-flex list-unstyled align-items-center text-white'>
                <li class='p-2'><i class='fa-solid fa-play d-none'></i></li>
                <li class='d-flex flex-column'><h6>${index.title}</h6><p>${index.artist.name}</p></li>
            </ul>
            <ul class='d-flex list-unstyled align-items-center text-white'>
                <li class='pe-4'><i onclick="play('${index.preview}')" id="cuore" class='fa-regular fa-heart d-none p-2'></i></li>
                <li class=''>${index.duration}</li>
                <li class=''><i class='fa-solid fa-ellipsis p-2 d-none'></i></li>
            </ul> 
        </div>`
    }
})

document.addEventListener('scroll', function() {
    const TOP = document.querySelector(".top-bar ul:first-child")
    let scrollPosition = window.scrollY
    let height = 340
    if (scrollPosition >= height) {
        TOP.innerHTML = `<li class="bg-success br-50 me-3"><i id="top-bar" class="fa-solid fa-play p-3"></i></li>
        <li class="text-white"><h1 id="li">${dataName}</h1></li>`
    }
})