var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

d3.json(queryUrl, function(data) {
    console.log(data.features);

//add leaflet features
// Define streetmap and darkmap layers
var streetmap = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/light-v10",
    accessToken: API_KEY
});

var darkmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
    maxZoom: 18,
    id: "dark-v10",
    accessToken: API_KEY
});

// Define a baseMaps object to hold our base layers
var baseMaps = {
    "Street Map": streetmap,
    "Dark Map": darkmap
};

var quakeLayer = L.geoJSON(data, {
    onEachFeature: function(features, layer) {
        layer.bindPopup(`<p><h3>${features.properties.place}</h3><hr/></p>`)
    }
})


///ATTEMPTED CIRCLE RADIUS AND COLORING, BUT COULDN'T GET IT TO WORK

// var markerSize = L.geoJSON(data.features.properties.mag, {
//     onEachFeature: function(features, layer) {
//       return L.circleMarker(layer, {
//         radius: markerSize(feature.properties.mag),
//         fillColor: colorRange(feature.properties.mag),
//         color: "red",
//         weight: 0.5,
//         opacity: 0.5,
//         fillOpacity: 0.5
//       });
//     },
 
//});

//Create overlay object to hold our overlay layer
var overlayMaps = {
    Quakes: quakeLayer
    //Circles: markerSize
};





//Create overlay object to hold our overlay layer
var overlayMaps = {
    Quakes: quakeLayer
};

// Create our map, giving it the streetmap and earthquakes layers to display on load
var myMap = L.map("map", {
    center: [
      37.09, -95.71
    ],
    zoom: 5,
    layers: [streetmap, quakeLayer]
});

// Add the layer control to the map
L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
}).addTo(myMap);

});


