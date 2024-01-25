import './style.css';
import Map from 'ol/Map.js';
import OSM from 'ol/source/OSM.js';
import TileLayer from 'ol/layer/Tile.js';
import TileWMS from 'ol/source/TileWMS.js';
import View from 'ol/View.js';


const map = new Map({
  target: 'map',
  layers: [
    new TileLayer({
      source: new OSM(),
    }),
  ],
  view: new View({
    center: [0, 0],
    zoom: 2,
  }),
});



const layer = new TileLayer({
      source: new TileWMS ({
        attribuitions: '@geoserver',
        url:'http://localhost:8080/geoserver/portao/wms?',
        params:{
          'LAYERS': 'portao:portao_g_bairro',
      }
    })
})

map.addLayer(layer)