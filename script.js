const urlForSpecificCity = `https://danepubliczne.imgw.pl/api/data/synop/station/`; 

//pozyskanie danych z localStorage
if(localStorage.getItem("info")){
    document.getElementById('info').innerHTML = localStorage.getItem("info");
    document.body.style.backgroundImage = localStorage.getItem("backGround");
}

//Pozyskanie danych z formularza
const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  for (const tab of formData.entries()) {
    showInfo(tab[1]);
  }
})

//Pobieranie danych z API i wyświetlanie ich na stronie
const showInfo = (name) => {
    clearedName = name.toLowerCase().replace("ę", "e")
    .replace("ł", "l").replace("ą", "a").replace("ś", "s")
    .replace("ć", "c").replace("ż", "z").replace("ź", "z")
    .replace("ń", "n").replace("ó", "o").replace(/ /g,'');
    const newUrl = urlForSpecificCity+clearedName;

    fetch(newUrl).then((response) => {
        return response.json();
        })
        .then((data)=>{
            let data_pomiaru = data.data_pomiaru;
            let temperatura = data.temperatura;
            let suma_opadu = data.suma_opadu;
            let cisnienie = data.cisnienie;
            const info = 
            `
            <h3>Uzyskane dane miasta ${name}:</h2>
            <p>${data_pomiaru} </p>
            <p><img src="assets/temperatura.svg" alt="Temperatura"/>Temperatura: ${temperatura} ℃</p>
            <p><img src="assets/opady.svg" alt="opady"/>Suma opadu: ${suma_opadu} l/m<sup>2</sup></p>
            <p><img src="assets/cisnienie.svg" alt="cisnienie"/>Ciśnienie: ${cisnienie} hPa</p>
            `;
            document.getElementById('info').innerHTML = info;
            document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('assets/${clearedName}.jpg')`;
            
            localStorage.clear();
            localStorage.setItem("info",info);
            localStorage.setItem("backGround",`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('assets/${clearedName}.jpg')`);
        })
        .catch(function(error){
            console.log(error);
    })
}

//Funkcjonalność zrobiona w celu porównania stylów, postanowiłem jednak zostawić ją jako włączenie/wyłączenie trybu ciemnego
let style = "white";

function changeStyle(){
    if(style === "white"){
        style = "black";
        document.getElementsByClassName('container')[0].style.backgroundColor =  "rgba(0, 0, 0, 0.9)";
        document.body.style.color = "rgb(255, 255, 255)";
    }
    else{
        style = "white";
        document.getElementsByClassName('container')[0].style.backgroundColor =  "rgba(255, 255, 255, 1)";
        document.body.style.color = "rgb(0, 0, 0)";
    }
}