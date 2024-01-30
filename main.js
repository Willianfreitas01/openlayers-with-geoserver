import './style.css';
import View from 'ol/View.js';
import "ol/ol.css";
import "ol-ext/dist/ol-ext.css";
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import LayerSwitcher from "ol-ext/control/LayerSwitcher"
import {transform} from 'ol/proj.js';


function addWMSTileLayer(title, url, layers) {
  return new TileLayer({
    title:title,
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
      title:'Mapa OL',
      source: new OSM(),
    }),

    addWMSTileLayer('Logradouro','http://localhost:8080/geoserver/portao/wms', 'portao:portao_g_logradouro'),
    addWMSTileLayer('Limite','http://localhost:8080/geoserver/portao/wms', 'portao:portao_g_limite'),
    addWMSTileLayer('Bairro','http://localhost:8080/geoserver/portao/wms', 'portao:portao_g_bairro'),
  ],

  view: new View({
    center: transform([-51.2902375592119384,-29.7268898592075494], 'EPSG:4326', 'EPSG:3857'),
    zoom: 12,
  }),
});


const layerswitcher = new LayerSwitcher()

map.addControl(layerswitcher)