const url = `https://danepubliczne.imgw.pl/api/data/synop`;

const select = document.getElementById('city');
const options = document.createDocumentFragment();

fetch(url).then((response) => {
    return response.json();
})
    .then((data)=>{
        let citiesData = data;
        citiesData.map(function(stacje){
            let option = document.createElement('option');
            let stacja = document.createElement('p');
            stacja.innerHTML = `${stacja.stacja}`;
            //option
        });
    })