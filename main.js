var tmp = ol;

const highlightStyle = new ol.style.Style({
  fill: new ol.style.Fill({
    color: '#EEE',
  }),
  stroke: new ol.style.Stroke({
    color: '#3399CC',
    width: 2,
  }),
});

const vector = new ol.source.VectorTileLayer({
  background: 'white',
  source: new ol.source.VectorTileSource({
    url: 'https://openlayers.org/data/vector/us-states.json',
    format: new ol.format.GeoJSON(),
  }),
});

const map = new Map({
  layers: [vector],
  target: 'map',
  view: new View({
    center: fromLonLat([-100, 38.5]),
    zoom: 4,
    multiWorld: true,
  }),
});

const selected = [];

const status = document.getElementById('status');

map.on('singleclick', function (e) {
  map.forEachFeatureAtPixel(e.pixel, function (f) {
    const selIndex = selected.indexOf(f);
    if (selIndex < 0) {
      selected.push(f);
      f.setStyle(highlightStyle);
    } else {
      selected.splice(selIndex, 1);
      f.setStyle(undefined);
    }
  });

  status.innerHTML = '&nbsp;' + selected.length + ' selected features';
});
