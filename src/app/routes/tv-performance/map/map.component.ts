import { Component, OnInit } from '@angular/core';
import Feature from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import TileLayer from 'ol/layer/Tile';
import VectorLayer from 'ol/layer/Vector';
import LineString from 'ol/geom/LineString';
import Point from 'ol/geom/Point';
import { Stroke, Style, Icon } from 'ol/style';
import { OSM, Vector as VectorSource } from 'ol/source';
import Select from 'ol/interaction/Select.js';
import XYZ from 'ol/source/XYZ.js';
import GeoJSON from 'ol/format/GeoJSON.js';

import { AntennaService } from './../../../shared/services/tv-performance/antenna/antenna.service';
import { TvPerformanceDataService } from '../../../shared/services/tv-performance/tv-performance-data.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  map: any;
  style: any;
  flightDetails: any;

  constructor(
    private mapService: AntennaService,
    private dataService: TvPerformanceDataService) { }

  ngOnInit() {
    this.dataService.getData().subscribe(data => {
      if (data['id'] && data['icao']) {
        this.flightDetails = data;
        this.getFlightLatAndLang();
      }
    });
  }

  getFlightLatAndLang() {
    this.mapService.getAntennaDetails(this.flightDetails['icao'], this.flightDetails['id'])
      .subscribe(res => {
        if (res.length) {
          this.getLocationData(res);
        }
      }, err => console.log(err));
  }

  getLocationData(data) {

    // For detail design page
    // geoJson have longitude/latitude coordinates sequence
    //  and projection must be 'EPSG:4326' for geoJson data
    // https://medium.com/@sumit.arora/what-is-geojson-geojson-basics-visualize-geojson-open-geojson-using-qgis-open-geojson-3432039e336d

    const features = [];

    for (let i = 0; i < data.length - 1; i++) {
      const start = i;
      const end = i + 1;

      const longitudeStart = data[start]['longitude'];
      const latitudeStart = data[start]['latitude'];
      const longitudeEnd = data[end]['longitude'];
      const latitudeEnd = data[end]['latitude'];

      features.push({
        'type': 'Feature',
        'geometry': {
          'type': 'LineString',
          'coordinates': [[longitudeStart, latitudeStart], [longitudeEnd, latitudeEnd]]
        },
        'properties': {
          'antennaState': data[start]['antennaState'],
          'rssi': data[start]['rssi'],
          'timeStamp': data[start]['timeStamp']
        }
      });
    }

    // add first geo point pin
    const firstLongitude = data[0]['longitude'];
    const firstLatitude = data[0]['latitude'];

    features.push({
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [firstLongitude, firstLatitude]
      },
      'properties': {
        'name': 'departure'
      }
    });

    // add last point pin
    const lastLongitude = data[data.length - 1]['longitude'];
    const lastLatitude = data[data.length - 1]['latitude'];

    features.push({
      'type': 'Feature',
      'geometry': {
        'type': 'Point',
        'coordinates': [lastLongitude, lastLatitude]
      },
      'properties': {
        'name': 'arrival'
      }
    });

    const geojsonObject = {
      'type': 'FeatureCollection',
      'features': features,
    };

    const vectorSource = new VectorSource({
      features: (new GeoJSON()).readFeatures(geojsonObject),
    });

    const styles = {
      'route-green': new Style({
        stroke: new Stroke({
          width: 6,
          color: '#00FF00'
        })
      }),
      'route-red': new Style({
        stroke: new Stroke({
          width: 6,
          color: '#FF0000'
        })
      }),
      'startIcon': new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: './../assets/img/tv-map/departure.png'
        })
      }),
      'endIcon': new Style({
        image: new Icon({
          anchor: [0.5, 1],
          src: './../assets/img/tv-map/arrival.png'
        })
      })
    };

    const styleFunction = function (feature) {
      // console.log('styleFunction - type: ', feature.getGeometry().getType());
      const featureProperties = feature.getProperties();
      // console.log('styleFunction for ', featureProperties);

      if (feature.getGeometry().getType() === 'Point') {
        return feature.values_.name === 'departure' ? styles['startIcon'] : styles['endIcon'];
      } else if ((featureProperties.antennaState === 'Tracking') && (featureProperties.rssi >= -5.0)) {
        return styles['route-green'];
      } else {
        return styles['route-red'];
      }
    };

    const vectorLayer = new VectorLayer({
      source: vectorSource,
      style: styleFunction
    });

    const view = new View({
      projection: 'EPSG:4326',
      center: [0, 0],
      zoom: 3
    });


    // For good map with terrain but need to pay...
    // const url = 'https://{1-4}.aerial.maps.cit.api.here.com' +
    //   '/maptile/2.1/maptile/newest/terrain.day/{z}/{x}/{y}/256/png' +
    //   '?app_id=Your HERE Maps appId from https://developer.here.com&app_code=Your HERE Maps appCode from https://developer.here.com/';

    this.map = new Map({
      layers: [
        new TileLayer({
          source: new OSM(),
        }),
        // new TileLayer({
        //   // visible: true,
        //   // preload: Infinity,
        //   source: new XYZ({
        //     url: url,
        //     attributions: ''
        //   })
        // }),
        vectorLayer
      ],
      target: 'map',
      view: view
    });

    // fit map
    const extent = vectorLayer.getSource().getExtent();
    this.map.getView().fit(extent, {
      size: this.map.getSize()
    });

    // https://openlayers.org/en/latest/examples/select-features.html
    const select = new Select();
    this.map.addInteraction(select);
    select.on('select', e => {
      if (e.target.getFeatures().array_[0]) {
        const featureProperties = e.target.getFeatures().array_[0].getProperties();
        console.log('feature selected with antenna state: ', featureProperties.antennaState);
        console.log('feature selected with rssi: ', featureProperties.rssi);
        console.log('feature selected with rssi: ', featureProperties.timeStamp);
      }
    });
  }
}
