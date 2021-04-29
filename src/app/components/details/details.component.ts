import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DataStation } from 'src/app/data/station';
import { DataStationChange } from '../../data/stationchange';
import { DataCheck } from '../../data/check';
import { DataCheckstep } from '../../data/checkstep';
import { RadiobrowserService, ResultByServer } from 'src/app/services/radiobrowser.service';
import { RestcountriesService } from 'src/app/services/restcountries.service';
import { DataStationClick } from 'src/app/data/stationclick';
import { ActivatedRoute } from '@angular/router';
import * as L from 'leaflet';
import { Chart, BarElement, BarController, CategoryScale, LinearScale } from 'chart.js';

Chart.register(
  BarElement,
  BarController,
  CategoryScale,
  LinearScale,
);

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit, AfterViewInit {

  public station: DataStation;
  public list_changes: DataStationChange[];
  public list_checks: DataCheck[];
  public list_check_steps: ResultByServer<DataCheckstep[]>[];
  public list_clicks: DataStationClick[];

  public marker = null;
  public mymap = null;
  public map_exact = false;

  private chart = null;
  @ViewChild('chart_div') chart_div: ElementRef;
  private stationuuid = null;

  constructor(
    private radiobrowser: RadiobrowserService,
    private countryservice: RestcountriesService,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.stationuuid = this.route.snapshot.paramMap.get('id');

    this.radiobrowser.get_changes(this.stationuuid).subscribe(data => {
      this.list_changes = data;
    });

    this.radiobrowser.get_checks(this.stationuuid).subscribe(data => {
      this.list_checks = data.reverse();
    });

    this.radiobrowser.get_check_steps(this.stationuuid).then(data => {
      this.list_check_steps = data;
    });
  }

  ngAfterViewInit(): void {
    this.radiobrowser.get_station(this.stationuuid).toPromise().then(station => {
      this.station = station;
      if (this.station && this.station.geo_lat && this.station.geo_long) {
        var latlng = L.latLng(this.station.geo_lat, this.station.geo_long);
        this.show_map(latlng, true);
        return null;
      } else {
        console.log("no exact information available");
        return this.countryservice.getCountryByCode(this.station.countrycode).toPromise();
      }
    }).then(countryinfo => {
      if (countryinfo) {
        console.log("got country info", countryinfo.latlng);
        var latlng = L.latLng(countryinfo.latlng);
        this.show_map(latlng, false);
      }
    });

    this.initchart();
    this.radiobrowser.get_clicks(this.stationuuid, 86400).subscribe(data => {
      this.list_clicks = data;
      this.chart.reset();
      this.chart.data.datasets[0].data = clicks_to_buckets(this.list_clicks);
      this.chart.update();
    });
  }

  show_map(latlng: L.latLng, exact: boolean) {
    if (!this.mymap) {
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

      this.map_exact = exact;
      var bounds = L.latLngBounds(latlng, latlng);
      var zoom = 10;
      if (!exact) {
        zoom = 5;
      }
      this.mymap = L.map('mapid_show', {
        dragging: false,
        maxBounds: bounds,
      }).setView(latlng, zoom);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png ', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 2,
        tileSize: 256,
      }).addTo(this.mymap);
      if (exact) {
        this.marker = L.marker(latlng).addTo(this.mymap);
      }
    }
  }

  initchart() {
    let ctx = this.chart_div.nativeElement.getContext('2d');
    let labels = [];
    for (let i = 23; i > 0; i--) {
      labels.push("-" + i + "h");
    }
    labels.push("now");
    Chart.defaults.color = "white";
    Chart.defaults.borderColor = "grey";
    this.chart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels,
        datasets: [{
          label: 'Clicks in the last 24 hours',
          backgroundColor: 'rgba(200, 200, 200, 0.99)',
          data: []
        }]
      },

      options: {
        responsive: true,
        maintainAspectRatio: false,
      }
    });
  }
}

function clicks_to_buckets(list: DataStationClick[]): number[] {
  let buckets: number[] = [];
  let now_unix = Date.now() / 1000;

  for (var i = 0; i < 24; i++) {
    buckets[i] = 0;
  }

  for (var item of list) {
    var item_unix = item.clicktimestamp_iso8601.getTime() / 1000;
    var bucket = Math.floor((now_unix - item_unix) / 3600);
    if (bucket < 24) {
      buckets[bucket] += 1;
    }
  }
  return buckets.reverse();
}
