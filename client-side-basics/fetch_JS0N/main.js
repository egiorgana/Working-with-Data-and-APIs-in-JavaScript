// MAKING A MAP AND TILES
const mymap = L.map('mapid').setView([0, 0], 0);
const attribution = '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreenMap</a> contributors'

// MAKING A MARKER WITH A CUSTOM ICON
const issIcon = L.icon({
    iconUrl: 'ISS.svg.png',
    iconSize: [50, 32],
    iconAnchor: [25, 16],
    popupAnchor: [-3, -76]
})

const marker = L.marker([0, 0], {icon: issIcon}).addTo(mymap)

const tileUrl = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
const tiles = L.tileLayer(tileUrl, { attribution })
tiles.addTo(mymap)

const api_url = 'https://api.wheretheiss.at/v1/satellites/25544'

let firstTime = true

async function getISS(){
    const response = await fetch(api_url)
    const data = await response.json()
    const { latitude, longitude } = data
    marker.setLatLng([latitude, longitude])
    if(firstTime){
        mymap.setView([latitude, longitude], 2)
        firstTime = false
    }
    document.getElementById('lat').textContent = latitude.toFixed(2)
    document.getElementById('long').textContent = longitude.toFixed(2)
}

getISS()

setInterval(getISS, 1000)