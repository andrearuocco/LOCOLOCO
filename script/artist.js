const params = new URLSearchParams(location.search)
console.log(params)
let id = params.get("id")

let artist_endpoint = "https://striveschool-api.herokuapp.com/api/deezer/artist/" + id;

const getDataAr = async () => {
    const response = await fetch(artist_endpoint);
    const data = await response.json();
    return data;
};

getDataAr().then(data => {
    console.log(data)
})
