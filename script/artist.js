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

getDataAr().then(data => {
    let imageAr = data.picture_big
    const IMG = document.querySelector(".jumbotron img")
    IMG.src = data.picture_big
    const H1 = document.querySelector("#name")
    H1.innerText = data.name
    const FAN = document.getElementById("fan")
    FAN.innerText = data.nb_fan + " ascoltatori mensili"
    newFetch(data.tracklist).then(data => {
        //console.log(data)
        const FIVE = document.getElementById("five")
        const ONE = document.getElementById("one")
        data.data.slice(0, 5).forEach(element => {
            console.log(element)
            FIVE.innerHTML += `<ul class='mx-1 d-flex list-unstyled align-items-center text-white'><li class='p-2'><i class='fa-solid fa-play d-none'></i></li><li class='d-flex col-6'><img src='${element.album.cover_small}' class='cinqpx px50 me-2'/><h6>${element.title}</h6></li><li class='col-2'>${element.rank}</li><li class='col-1'></li><li class='d-flex col-2 align-items-center'><i class='fa-regular fa-heart d-none p-2'></i><span class='ms-2'>${element.duration}</span><i class='fa-solid fa-ellipsis p-2 d-none'></i></li></ul>`
        });
        data.data.slice(1, 2).forEach(element => {
            console.log(element.contributors.picture_small)
            ONE.innerHTML += `<img src='${element.album.cover_small}' class='br-20 centpx px100 col-6 me-2'/><div class='col-5'>
            <div class='d-flex bg-cb align-items-center br-20'><img src='${imageAr}' class='br-50 col-6 ms-2 pi-px px-pi py-0'/><p class='py-2'>FUORI ORA!</p></div>
            <h5 class='text-white'>${element.title}</h5></div>`
        })
    })
})
