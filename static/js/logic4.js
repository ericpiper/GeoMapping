var startCoords = [7.0, -21.0];
var mapZoomLevel = 2.5;

function getQuakes() {
    return d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson")
        .then(data => data.features.properties.ids)
        .catch(console.error)
}

getQuakes()

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

function createMarkers(features.properties.ids) {
    var quakeMarkers = features.properties.ids.map(quake => {
        return L.marker([features.geometries.coordinates])
            .bindPopup(`<p>${features.properties.ids}</p>`)
    });

    var markerLayer = L.layerGroup(quakeMarkers)
        return markerLayer;
}

function run() {
    getQuakes()
        .then(createMarkers);
        .then(createMap);
}

run();