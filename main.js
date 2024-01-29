import './style.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import View from 'ol/View.js';import "ol/ol.css"
import "ol-ext/dist/ol-ext.css"

import LayerSwitcher from "ol-ext/control/LayerSwitcher"

function addWMSTileLayer(url, layers) {
  return new TileLayer({
    source: new TileWMS({
      attributions: '@geoserver',
      url: url,
      params: {
        'LAYERS': layers,
      },
    }),
  });
}

const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
    addWMSTileLayer('http://localhost:8080/geoserver/portao/wms', 'portao:portao_g_logradouro'),
    addWMSTileLayer('http://localhost:8080/geoserver/portao/wms', 'portao:portao_g_limite'),
    addWMSTileLayer('http://localhost:8080/geoserver/portao/wms', 'portao:portao_g_bairro'),
  ],
  view: new View({
    center: [0,0],
    zoom: 2,
  }),
});


const layerswitcher = new LayerSwitcher()

map.addControl(layerswitcher)