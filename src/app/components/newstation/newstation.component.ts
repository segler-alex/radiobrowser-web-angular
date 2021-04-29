import { AfterViewInit, Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { merge, Observable, of, OperatorFunction } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap, scan, catchError, map, tap } from 'rxjs/operators';
import { DataStation } from 'src/app/data/station';
import { DataStationNew, RadiobrowserService } from 'src/app/services/radiobrowser.service';
import { RestcountriesService } from 'src/app/services/restcountries.service';
import * as L from 'leaflet';
import { Router } from '@angular/router';

@Component({
  selector: 'app-newstation',
  templateUrl: './newstation.component.html',
  styleUrls: ['./newstation.component.css']
})
export class NewstationComponent implements OnInit, AfterViewInit {

  public marker = null;
  public minimap = null;

  constructor(
    private rb: RadiobrowserService,
    private countriesservices: RestcountriesService,
    private modalService: NgbModal,
    private router: Router,
  ) { }

  stations: DataStation[] = [];

  station: StationNew = {
    name: "",
    url: "",
    homepage: "",
    favicon: "",
    country: null,
    state: "",
    language: "",
    language_arr: [],
    tags: "",
    tags_arr: [],
    geo_lat: null,
    geo_long: null,
  };

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.show_map();
  }

  show_map() {
    if (!this.minimap) {
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

      var bounds = L.latLngBounds(L.latLng(-90, -180), L.latLng(90, 180));
      var zoom = 2;
      this.minimap = L.map('mapid_show', {
        maxBounds: bounds,
        maxBoundsViscosity: 1.0,
      }).setView(L.latLng([0, 0]), zoom);
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png ', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 18,
        minZoom: 2,
        tileSize: 256,
        continuousWorld: false,
        noWrap: true,
      }).addTo(this.minimap);
      this.minimap.on('click', (e: any) => this.onMapClick(e));
    }
  }

  onMapClick(e: any) {
    this.clearmarker();
    this.marker = L.marker(e.latlng).addTo(this.minimap);
  }

  clearmarker() {
    if (this.marker) {
      this.minimap.removeLayer(this.marker);
      this.marker = null;
    }
  }

  namechanged(name: any) {
    if (("" + name).trim().length > 1) {
      this.rb.getStations({
        name: name,
        limit: 25,
        offset: 0,
      }).subscribe(stations => {
        this.stations = stations;
      });
    } else {
      this.stations = [];
    }
  }

  state_search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => term.length < 2 ? of([]) :
        this.rb.getStates(term, "stationcount", 10),
      ),
      map(states => states.slice(0, 10).map((state) => state.name)),
      map(states => [...new Set(states)]),
      catchError(() => {
        return of([]);
      }),
    );

  language_search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => term.length < 2 ? of([]) :
        this.rb.getLanguages(term, "stationcount", 10),
      ),
      map(languages => languages.slice(0, 10).map((language) => language.name)),
      catchError(() => {
        return of([]);
      }),
    );

  add_language(language) {
    if (("" + language).trim() === "") return;

    let index = this.station.language_arr.indexOf(language);
    if (index < 0) {
      this.station.language_arr.push(language);
    }
    this.station.language = "";
  }

  remove_language(language) {
    let index = this.station.language_arr.indexOf(language);
    if (index >= 0) {
      this.station.language_arr.splice(index, 1);
    }
  }

  tag_search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => term.length < 2 ? of([]) :
        this.rb.getTags(term, "stationcount", 10),
      ),
      map(tags => tags.slice(0, 10).map((tag) => tag.name)),
      catchError(() => {
        return of([]);
      }),
    );

  add_tag(tag) {
    if (("" + tag).trim() === "") return;

    let index = this.station.tags_arr.indexOf(tag);
    if (index < 0) {
      this.station.tags_arr.push(tag);
    }
    this.station.tags = "";
  }

  remove_tag(tag) {
    let index = this.station.tags_arr.indexOf(tag);
    if (index >= 0) {
      this.station.tags_arr.splice(index, 1);
    }
  }

  country_search: OperatorFunction<string, readonly string[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      switchMap(term => term.length < 2 ? of([]) :
        this.countriesservices.getCountries(term),
      ),
      catchError(() => {
        return of([]);
      }),
    );

  country_input_formatter = (x: { name: string, nativeName: string, alpha2Code: string }) => `${x.name}`;

  country_result_formatter = (x: { name: string, nativeName: string, alpha2Code: string }) => `${x.name} / ${x.nativeName} (${x.alpha2Code})`;

  delete_input_formatter = () => "";

  station_post: any = {};
  station_post_json: string = "";
  sending: boolean = false;

  onSubmit(content) {
    this.sending = true;
    let station_post: DataStationNew = {
      name: this.station.name,
      url: this.station.url,
      homepage: this.station.homepage,
      favicon: this.station.favicon,
      countrycode: this.station.country.alpha2Code,
      state: this.station.state,
      language: this.station.language_arr.join(","),
      tags: this.station.tags_arr.join(","),
    };
    if (this.marker) {
      if (!confirm("Are you sure about the location of the stream?")) {
        alert("Saving was canceled! Please remove the Lat/Long if you are unsure.");
        this.sending = false;
        return;
      }
      var latlng = this.marker.getLatLng();
      station_post.geo_lat = latlng.lat;
      station_post.geo_long = latlng.lng;
    }

    this.station_post = station_post;
    this.station_post_json = JSON.stringify(station_post, null, " ");

    this.rb.addStation(station_post).toPromise().then(result => {
      this.modalService.open(content, {
        windowClass: 'dark-modal',
        size: 'lg',
      }).result.then((result) => {
      }, (reason) => {
      });
    }).finally(() => {
      this.sending = false;
      this.router.navigate(['/lastchange']);
    });
  }
}

interface StationNew {
  name: string,
  url: string,
  homepage: string,
  favicon: string,
  country: any,
  state: string,
  language: string,
  language_arr: string[],
  tags: string,
  tags_arr: string[],
  geo_lat: number,
  geo_long: number,
}
