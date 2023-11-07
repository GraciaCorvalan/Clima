let ciudad = document.querySelector('#ciudad');
let btnbuscar = document.querySelector('#btnbuscar');
let infoclima = document.querySelector('.infoclima');
let cities = document.querySelector('#cities');
let latitud;
let longitud;

const filter = async () => {
    try {
        const respuesta1 = await fetch(`https://api.weatherapi.com/v1/search.json?key=c44474cd5b7543acaa5162618233008&q=${ciudad.value}`);
        console.log(respuesta1)
        const datos1 = await respuesta1.json();
        let posibilidades = "";

        for (let i = 0; i < datos1.length; i++) {
            posibilidades = posibilidades + `<option value="${datos1[i].name}, ${datos1[i].region}, ${datos1[i].country}"></option>`;
        }
        cities.innerHTML = `${posibilidades}`
    } catch (error) {
        console.log("error en el catch" + error)
    }
};
ciudad.addEventListener('keydown', filter)


const buscarclima = async () => {
    try {
        const respuesta = await fetch(`https://api.weatherapi.com/v1/current.json?key=c44474cd5b7543acaa5162618233008&q=${ciudad.value}&aqi=no`);
        const datos = await respuesta.json();
        console.log(datos)
        infoclima.innerHTML = `
        <h5>Última actualización: ${datos.current.last_updated}</h5>
        <h1> ${datos.location.name},<br> ${datos.location.region},${datos.location.country}   </h1>
        <h2>La temperatura actual es : ${datos.current.temp_c} ºC </h2>
        <h3>La sensacion térmica es : ${datos.current.feelslike_c
            }°C</h3>
        <h2>${datos.current.condition.text}</h2>
        <img src=${datos.current.condition.icon} width=20% height=20%>
        `;
        
        latitud = datos.location.lat;
        longitud = datos.location.lon;

        //A continuacion, la solicitud a google maps, desde la documentacion oficial
        let map;
        async function initMap() {
            const position = { lat: datos.location.lat, lng: datos.location.lon };
            console.log(position);

            const { Map } = await google.maps.importLibrary("maps");
            const { AdvancedMarkerView } = await google.maps.importLibrary("marker");

            map = new Map(document.querySelector('#map'), {
                zoom: 15,
                center: position,
                mapId: "DEMO_MAP_ID",
            });
            const marker = new AdvancedMarkerView({
                map: map,
                position: position,
                title: "untitle",
            });
        }

        initMap();

    } catch (error) {
        console.log("error del catch")
    }
};

btnbuscar.addEventListener('click', buscarclima)