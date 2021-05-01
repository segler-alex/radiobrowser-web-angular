import { AfterViewInit, Component, OnInit } from '@angular/core';
import * as L from 'leaflet';
import { DataStation } from 'src/app/data/station';
import { PlayerService } from 'src/app/services/player.service';
import { RadiobrowserService } from 'src/app/services/radiobrowser.service';

@Component({
  selector: 'app-geomap',
  templateUrl: './geomap.component.html',
  styleUrls: ['./geomap.component.css']
})
export class GeomapComponent implements OnInit, AfterViewInit {

  private stations: DataStation[] = null;
  private mymap = null;
  public playing_station: DataStation = null;

  constructor(private rb: RadiobrowserService, private player: PlayerService) { }

  initMap() {
    var bounds = L.latLngBounds(L.latLng(-90,-180), L.latLng(90,180));
    this.mymap = L.map('map', {
      maxBounds: bounds,
      maxBoundsViscosity: 1.0,
    }).setView([51.505, -0.09], 3);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png ', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 10,
      minZoom: 3,
      tileSize: 256,
      continuousWorld: false,
      noWrap: true,
    }).addTo(this.mymap);
  }

  ngOnInit(): void {
    this.player.active_station.subscribe(station => this.playing_station = station);
  }

  ngAfterViewInit(): void {
    const iconRetinaUrl = 'assets/marker-icon-2x.png';
    const iconUrl = 'assets/marker-icon.png';
    const shadowUrl = 'assets/marker-shadow.png';
    const iconDefault = L.icon({
      iconRetinaUrl,
      iconUrl,
      shadowUrl,
      iconSize: [25, 41],
      iconAnchor: [12, 41],
      popupAnchor: [1, -34],
      tooltipAnchor: [16, -28],
      shadowSize: [41, 41]
    });
    L.Marker.prototype.options.icon = iconDefault;

    this.initMap();
    this.rb.getStationsWithGeoInfos().subscribe(stations => {
      this.stations = stations;
      for (var station of stations) {
        let s = station;
        let marker = L.marker(L.latLng(station.geo_lat, station.geo_long)).addTo(this.mymap);
        marker.bindPopup("<p>" + station.name + "</p>");
        marker.on("click", () => {
          this.player.play(s);
          this.rb.count_click(s).toPromise().then(()=>console.log("counted click"));
        });
      }
    });
  }
}
