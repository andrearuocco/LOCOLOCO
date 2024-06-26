const params = new URLSearchParams(location.search)
console.log(params)
let id = params.get("id")

let artist_endpoint = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + id;

const getDataAr = async () => {
    const response = await fetch(artist_endpoint);
    const data = await response.json();
    return data;
};

const newFetch = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    return data;
};

let dataName = ""
getDataAr().then(data => {
    dataName = data.name
    let imageAr = data.picture_big
    const IMG = document.querySelector(".jumbotron img")
    IMG.src = data.picture_big
    const H1 = document.querySelector("#name")
    H1.innerText = data.name
    const FAN = document.getElementById("fan")
    FAN.innerText = data.nb_fan + " ascoltatori mensili"
    newFetch(data.tracklist).then(data => {
        //console.log(data)
        const TWO = document.getElementById("unpaio")
        const SIX = document.getElementById("six")
        const FIVE = document.getElementById("five")
        const ONE = document.getElementById("one")
        data.data.slice(0, 5).forEach(element => {
            //console.log(element)
            FIVE.innerHTML += `<ul class='d-flex list-unstyled align-items-center text-white'>
            <li class='p-2'><i class='fa-solid fa-play d-none'></i></li>
            <li class='d-flex col-6'><img src='${element.album.cover_small}' class='cinqpx px50 me-2'/><h6>${element.title}</h6></li>
            <li class='col-2 d-none d-sm-block'>${element.rank}</li><li class='col-1'></li>
            <li class='d-md-flex col-2 align-items-center d-none'><i class='fa-regular fa-heart d-none p-2'></i><span class='ms-2'>${element.duration}</span><i class='fa-solid fa-ellipsis p-2 d-none'></i></li>
            </ul>`
        });
        data.data.slice(1, 2).forEach(element => {
            ONE.innerHTML += `<img src='${element.album.cover_small}' class='br-20 centpx px100 col-6 me-2'/><div class='col-5'>
            <div class='d-flex bg-cb align-items-center br-20'><img src='${imageAr}' class='br-50 col-6 ms-2 pi-px px-pi mx-1'/><p class='my-0 py-0'>FUORI ORA!</p></div>
            <h5 class='text-white pt-2'>${element.title}</h5></div>`
        });
        data.data.slice(6, 12).forEach(element => {
            //console.log(element)
            SIX.innerHTML += `
            <div class="card bg-transparent col-12 col-sm-6 col-md-3 col-lg-2 position-relative">
                <img src="${element.album.cover_medium}" class="card-img-top" alt="ArAlbums">
                <div class="card-body">
                    <small><h6 id="h6" class="text-white card-title">${element.album.title}</h6></small>
                    <p class="card-text text-white text-opacity-50">${element.artist.name}</p>
                </div>
                <a href="album.html?id=${element.album.id}" class="btn btn-success position-absolute br-pa d-none"><i class='fa-solid fa-play p-2'></i></a>
            </div>`
        });
        data.data.slice(1, 3).forEach(element => {
            //console.log(element)
            TWO.innerHTML += `
            <div class="card bg-transparent col-12 col-sm-6 col-md-3 col-lg-2 position-relative">
                <img src="${element.album.cover_medium}" class="card-img-top" alt="Albums">
                <div class="card-body">
                    <small><h6 id="h6" class="text-white card-title">${element.title}</h6></small>
                    <p class="card-text text-white text-opacity-50">Album</p>
                </div>
                <a href="album.html?id=${element.album.id}" class="btn btn-success position-absolute br-pa d-none"><i class='fa-solid fa-play p-2'></i></a>
            </div>`
        });
    })
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
