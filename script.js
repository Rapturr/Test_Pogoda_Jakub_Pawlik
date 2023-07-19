const urlForSpecificCity = `https://danepubliczne.imgw.pl/api/data/synop/station/`; 

const form = document.querySelector('form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const formData = new FormData(form)
  for (const tab of formData.entries()) {
    showInfo(tab[1]);
  }
})

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
        let id_stacji = data.id_stacji;
        let data_pomiaru = data.data_pomiaru;
        let temperatura = data.temperatura;
        let suma_opadu = data.suma_opadu;
        let cisnienie = data.cisnienie;
        const info = 
        `<h3>Uzyskane dane miasta ${name}:</h2>
        <h4>Pomiar z dnia: ${data_pomiaru} 
        <br/>Temperatura: ${temperatura} ℃
        <br/>suma opadu: ${suma_opadu}
        <br/>cisnienie: ${cisnienie}</h4>
        `;
        //console.log(newUrl)
        document.getElementById('info').innerHTML = info;
        //document.body.style.backgroundImage = `url('assets/${clearedName}.jpg')`;
        document.body.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('assets/${clearedName}.jpg')`;
        //document.getElementById('bgim').style.backgroundImage = `linear-gradient(rgba(0,0,0,0.6),rgba(0,0,0,0.6)),url('assets/${clearedName}.jpg')`;
    })
    .catch(function(error){
        console.log(error);
})
}