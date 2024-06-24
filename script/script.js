let base_url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=";
let album_endpoint = "https://striveschool-api.herokuapp.com/api/deezer/album/";
let artist_endpoint = "https://striveschool-api.herokuapp.com/api/deezer/artist/";

const getDataAl = async () => {
  const response = await fetch(album_endpoint); 
  const data = await response.json(); 
  return data; 
};

const getData = async () => {
  const response = await fetch(base_url); 
  const data = await response.json(); 
  return data; 
}; 

const listArtist = async () => {
  let artists = [
    "eminem",
    "queen",
    "renatozero",
    "karmacoma",
    "ezrafurman",
    "pinguinitatticinucleari"
  ];
  artists.forEach(artist => {
    //console.log(artist)
    base_url = "https://striveschool-api.herokuapp.com/api/deezer/search?q=" + artist
    getData().then(data => {
      const ARTIST = document.getElementById("artist")
      data.data.slice(0, 1).forEach((element) => {
        //console.log(element.artist)
        ARTIST.innerHTML += `
        <div class="card bg-transparent col-12 col-sm-6 col-md-3 col-lg-2 position-relative">
            <img src="${element.artist.picture_medium}" class="card-img-top br-50">
            <div class="card-body">
              <small><h6 id="h6" class="text-white card-title">${element.artist.name}</h6></small>
              <p class="card-text text-white text-opacity-50">Artist</p>
            </div>
            <a href="artist.html?id=${element.artist.id}" class="btn btn-success position-absolute br-pa d-none"><i class='fa-solid fa-play p-2'></i></a> 
        </div>`

        album_endpoint = "https://striveschool-api.herokuapp.com/api/deezer/album/" + element.album.id
        getDataAl().then(album => {
          //console.log(album.cover_medium)
          const ALBUM = document.getElementById("album")
          ALBUM.innerHTML += `
          <div class="card bg-transparent col-12 col-sm-6 col-md-3 col-lg-2 position-relative">
              <img src="${album.cover_medium}" class="card-img-top br-50">
              <div class="card-body">
                <small><h6 id="h6" class="text-white card-title">${album.title}</h6></small>
                <small><small><p class="card-text text-white text-opacity-50">${album.artist.name}</p></small></small>
              </div>
              <a href="album.html?id=${album.id}" class="btn btn-success position-absolute br-pa d-none"><i class='fa-solid fa-play p-2'></i></a> 
          </div>` 
        })
      })
    })
  })
}

document.addEventListener("DOMContentLoaded", () => {
  listArtist()
});

