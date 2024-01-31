import './style.css';
import View from 'ol/View.js';
import "ol/ol.css";
import "ol-ext/dist/ol-ext.css";
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import LayerSwitcher from "ol-ext/control/LayerSwitcher";
import Popup from 'ol-popup/src/ol-popup'
import {transform} from 'ol/proj.js';
import { toStringHDMS } from 'ol/coordinate';


function layerSwitcherParams(title, layers) {
  return new TileLayer({
    title:title,
    source: new TileWMS({
      attributions: '@geoserver',
      url: 'http://localhost:8080/geoserver/portao/wms',
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

    layerSwitcherParams('Logradouro', 'portao:portao_g_logradouro'),
    layerSwitcherParams('Limite', 'portao:portao_g_limite'),
    layerSwitcherParams('Bairro', 'portao:portao_g_bairro'),
  
  ],

  view: new View({
    center: transform([-51.2902375592119384,-29.7268898592075494], 'EPSG:4326', 'EPSG:3857'),
    zoom: 12,
  }),
});


const layerswitcher = new LayerSwitcher()
map.addControl(layerswitcher)


var popup = new Popup({
  
});
map.addOverlay(popup);


map.on('singleclick', function(evt) {
    const coord = toStringHDMS(transform(evt.coordinate, 'EPSG:3857', 'EPSG:4326'), 2);
    
    popup.show(evt.coordinate, '<div> <h2>Coordinates</h2> <p>'+ coord + '</p> </div>');
});