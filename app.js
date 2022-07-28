const ip = document.getElementById('ip');
const loc = document.getElementById('location');
const timeZone = document.getElementById('timeZone');
const isp = document.getElementById('isp');
const searchBar = document.getElementById('searchBar');
const imgbtn = document.getElementById('imgbtn');

let ipAdress = '';
    
fetch('https://api.ipify.org/').then(
    r => r.text()
).then( (ip) =>{
    ipAdress = ip;
});


imgbtn.addEventListener('click', ()=>{
    if(searchBar.value !== ""){

        fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_OHLVm5yx3YY2Z7Y1GwbgG6m6Ft4DG&ipAddress=" + searchBar.value)
        .then(function(response){
            return response.json();
        }).then(function(data){
            console.log(data);
            ip.innerHTML = data.ip;
            loc.innerHTML = data.location.region + ", " + data.location.country + ",        " + data.location.geonameId;
            timeZone.innerHTML = "UTC " + data.location.timezone;
            isp.innerHTML = data.isp;
    
            ///////
            const map = L.map('map').setView([data.location.lat, data.location.lng], 16);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            maxZoom: 19,
            attribution: '© OpenStreetMap'
            }).addTo(map);
            var marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
            marker.bindPopup("Your Location").openPopup();
        });
    }else{
        alert("Enter valid Ip adress to continue")
    }
})
fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_OHLVm5yx3YY2Z7Y1GwbgG6m6Ft4DG&ipAddress=" + ipAdress)
.then(function(response){
    return response.json();
}).then(function(data){
    console.log(data);
    ip.innerHTML = data.ip;
    loc.innerHTML = data.location.region + ", " + data.location.country + ",        " + data.location.geonameId;
    timeZone.innerHTML = "UTC " + data.location.timezone;
    isp.innerHTML = data.isp;

    ///////
    const map = L.map('map').setView([data.location.lat, data.location.lng], 16);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
    }).addTo(map);
    var marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
    marker.bindPopup("Your Location").openPopup();
});




