const url = `https://danepubliczne.imgw.pl/api/data/synop`;
const urlForSpecificCity = `https://danepubliczne.imgw.pl/api/data/synop/station/`; 

const select = document.getElementById('city');
console.log("Fetching...");
fetch(url).then((response) => {
    return response.json();
    })
    .then((data)=>{
        let citiesData = data;
        citiesData.map(function(station){
            let option = document.createElement('option');
            option.innerHTML = `${station.stacja}`;
            select.appendChild(option);
        });
    })
    .catch(function(error){
        console.log(error);
})

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  for (const tab of formData.entries()) {
    showInfo(tab[1].toLowerCase().replace("ę", "e")
            .replace("ł", "l").replace("ą", "a").replace("ś", "s")
            .replace("ć", "c").replace("ż", "z").replace("ź", "z")
            .replace("ń", "n").replace("ó", "o").replace(/ /g,''));
  }
})

const showInfo = (name) => {
    const newUrl = urlForSpecificCity+name;


    //console.log("Fetching for ",name,"...");
fetch(newUrl).then((response) => {
    return response.json();
    })
    .then((data)=>{
        let id_stacji = data.id_stacji;
        let data_pomiaru = data.data_pomiaru;
        let godzina_pomiaru = data.godzina_pomiaru;
        let temperatura = data.temperatura;
        let predkosc_wiatru = data.predkosc_wiatru;
        let kierunek_wiatru = data.kierunek_wiatru;
        let wilgotnosc_wzgledna = data.wilgotnosc_wzgledna;
        let suma_opadu = data.suma_opadu;
        let cisnienie = data.cisnienie;
        const info = 
        `<h3>Uzyskane dane miasta ${name}:</h2>
        <h4>ID Stacji: ${id_stacji}  </h4><h4>Pomiar z dnia: ${data_pomiaru} 
        o godzinie ${godzina_pomiaru}  <br/>Temperatura: ${temperatura} ℃
        <br/>predkosc wiatru: ${predkosc_wiatru}  <br/>kierunek wiatru: ${kierunek_wiatru}
        <br/>wilgotnosc wzgledna: ${wilgotnosc_wzgledna}  <br/>suma opadu: ${suma_opadu}
        <br/>cisnienie: ${cisnienie}</h4>
        `;
        //console.log(newUrl)
        document.getElementById('info').innerHTML = info;
    })
    .catch(function(error){
        console.log(error);
})
}