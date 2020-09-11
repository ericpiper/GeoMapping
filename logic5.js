// Creating map object
var myMap = L.map("map", {
    center: [7.0, -21.0],
    zoom: 2.5
});
  
// Adding tile layer
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
}).addTo(myMap);
  
// Use this link to get the geojson data.
var link = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";
  
function createMap(quakeMap) {

    var light = L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
        attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
        tileSize: 512,
        maxZoom: 18,
        zoomOffset: -1,
        id: "mapbox/light-v10",
        accessToken: API_KEY
    });


    var baseMaps = {
          Light : light
    };

    var overlayMaps = {
          Quakes : quakeMap
    };

    var myMap = L.map("map", {
          center: startCoords,
          zoom: mapZoomLevel,
          layers: [light, quakeMap]
    });

    L.control.layer(baseMaps, overlayMaps, {
          collapsed: false
    }).addTo(myMap);
}


// Function that will add the marker
function createMarkers(feature.properties.ids) {
    var quakeMarkers = feature.properties.ids.map(quake => {
        return L.marker([feature.geometries.coordinates])
            .bindPopup(`<p>${feature.properties.ids}</p>`)
    });

    var markerLayer = L.layerGroup(quakeMarkers) 
        return markerLayer;
    
}
  
// Grabbing our GeoJSON data..
d3.json(link, function(data) {
    // Creating a geoJSON layer with the retrieved data
    L.geoJson(data, {
      // Passing in our style object
      style: mapStyle
    }).addTo(myMap);
});
  

  