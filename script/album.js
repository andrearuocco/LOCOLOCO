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
    console.log(data)
})