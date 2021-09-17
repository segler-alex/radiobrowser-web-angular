import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataStation } from '../data/station';
import { DataServerStats } from '../data/server-stats';
import { DataTag } from '../data/tag';
import { DataStationChange } from '../data/stationchange';
import { DataStationClick } from '../data/stationclick';
import { DataCheck } from '../data/check';
import { DataCheckstep } from '../data/checkstep';
import { DataCountry } from '../data/country';
import { DataCodec } from '../data/codec';
import { DataLanguage } from '../data/language';

var SERVER = "de1.api.radio-browser.info";
var SERVERs = [
  "de1.api.radio-browser.info",
  "nl1.api.radio-browser.info",
  "fr1.api.radio-browser.info",
];
var PROTOCOL = "https";

export interface DataStationNew {
    name: string,
    url: string,
    homepage: string,
    favicon: string,
    countrycode: string,
    state: string,
    language: string,
    tags: string,
    geo_lat?: number,
    geo_long?: number,
}

@Injectable({
  providedIn: 'root'
})
export class RadiobrowserService {

  getServer(){
    return PROTOCOL + "://" + SERVER;
  }

  constructor(private http: HttpClient) { }

  post(relLink, data) {
    return this.http.post(PROTOCOL + '://' + SERVER + relLink, data);
  }

  addStation(station: DataStationNew): Observable<any> {
    return this.http.post(PROTOCOL + '://' + SERVER + "/json/add", station);
  }

  vote(station: DataStation): Observable<any> {
    return this.http.get(PROTOCOL + '://' + SERVER + '/json/vote/' + station.stationuuid);
  }

  count_click(station: DataStation): Observable<any> {
    return this.http.get(PROTOCOL + '://' + SERVER + '/json/url/' + station.stationuuid);
  }

  getStationsLastChange(): Observable<DataStation[]> {
    return this.http.get<DataStation[]>(PROTOCOL + '://' + SERVER + '/json/stations/lastchange?limit=100').
      pipe(map(array => {
        array.forEach(element => fix_station(element));
        return array;
      }));
  }

  getStations(options: StationOptions): Observable<DataStation[]> {
    return this.http.post<DataStation[]>(PROTOCOL + '://' + SERVER + '/json/stations/search',
      options).
      pipe(map(array => {
        array.forEach(element => fix_station(element));
        return array;
      }));
  }

  getStationsTopClick(limit: number): Observable<DataStation[]> {
    let options = {
      order: "clickcount",
      reverse: true,
      hidebroken: true,
      offset: 0,
      limit: limit | 100,
    };
    return this.getStations(options);
  }

  getStationsTopVote(): Observable<DataStation[]> {
    let options = {
      order: "votes",
      reverse: true,
      hidebroken: true,
      offset: 0,
      limit: 100,
    };
    return this.getStations(options);
  }

  getStationsLastClick(): Observable<DataStation[]> {
    let options = {
      order: "clicktimestamp",
      reverse: true,
      hidebroken: true,
      offset: 0,
      limit: 100,
    };
    return this.getStations(options);
  }

  getStationsVerified(): Observable<DataStation[]> {
    let options = {
      has_extended_info: true,
      order: "clickcount",
      reverse: true,
      hidebroken: true,
      offset: 0,
      limit: 100,
    };
    return this.getStations(options);
  }

  getStationsWithGeoInfos(): Observable<DataStation[]> {
    let options = {
      has_geo_info: true,
      hidebroken: true,
      offset: 0,
      limit: 1000,
    };
    return this.getStations(options);
  }

  getStats(): Observable<DataServerStats> {
    return this.http.get<DataServerStats>(PROTOCOL + '://' + SERVER + '/json/stats');
  }

  getTags(name: string, order: "name" | "stationcount" = "name", limit: number = 5): Observable<DataTag[]> {
    return this.http.get<DataTag[]>(PROTOCOL + '://' + SERVER + `/json/tags/${name}?hidebroken=true&limit=${limit}&reverse=true&order=${order}`);
  }

  getLanguages(name: string, order: "name" | "stationcount" = "name", limit: number = 5): Observable<DataLanguage[]> {
    return this.http.get<DataLanguage[]>(PROTOCOL + '://' + SERVER + `/json/languages/${name}?hidebroken=true&limit=${limit}&reverse=true&order=${order}`);
  }

  getCountries(name: string, order: "name" | "stationcount" = "name", limit: number = 5): Observable<DataCountry[]> {
    return this.http.get<DataCountry[]>(PROTOCOL + '://' + SERVER + `/json/countrycodes/${name}?hidebroken=true&limit=${limit}&reverse=true&order=${order}`);
  }

  getStates(name: string, order: "name" | "stationcount" = "name", limit: number = 5): Observable<DataCountry[]> {
    return this.http.get<DataCountry[]>(PROTOCOL + '://' + SERVER + `/json/states/${name}?hidebroken=true&limit=${limit}&reverse=true&order=${order}`);
  }

  getCodecs(name: string, order: "name" | "stationcount" = "name", limit: number = 5): Observable<DataCodec[]> {
    return this.http.get<DataCodec[]>(PROTOCOL + '://' + SERVER + `/json/codecs/${name}?hidebroken=true&limit=${limit}&reverse=true&order=${order}`);
  }

  get_station(stationuuid: string): Observable<DataStation> {
    return this.http.get<DataStation[]>(PROTOCOL + '://' + SERVER + '/json/stations/byuuid/' + stationuuid)
      .pipe(map(array => {
        return fix_station(array[0]);
      }));
  }

  get_changes(stationuuid: string): Observable<DataStationChange[]> {
    return this.http.get<DataStationChange[]>(PROTOCOL + '://' + SERVER + '/json/stations/changed/' + stationuuid)
      .pipe(map(array => {
        for (var i = 0; i < array.length; i++) {
          array[i].lastchangetime_iso8601 = new Date(array[i].lastchangetime_iso8601);
        }
        return array;
      }));
  }

  get_clicks(stationuuid: string, seconds: number): Observable<DataStationClick[]> {
    return this.http.get<DataStationClick[]>(PROTOCOL + '://' + SERVER + '/json/clicks/' + stationuuid + "?seconds=" + seconds)
      .pipe(map(array => {
        for (var i = 0; i < array.length; i++) {
          array[i].clicktimestamp_iso8601 = new Date(array[i].clicktimestamp_iso8601);
        }
        return array;
      }));
  }

  get_checks(stationuuid: string): Observable<DataCheck[]> {
    return this.http.get<DataCheck[]>(PROTOCOL + '://' + SERVER + '/json/checks/' + stationuuid)
      .pipe(map(list_checks => {
        for (var i = 0; i < list_checks.length; i++) {
          list_checks[i].timestamp_iso8601 = new Date(list_checks[i].timestamp_iso8601)
        }
        return list_checks;
      }));
  }

  get_all_servers<T>(relLink: string): Promise<ResultByServer<T>[]> {
    let jobs = SERVERs.map(servername =>
      this.http.get<T>(PROTOCOL + "://" + servername + relLink).toPromise()
    );

    return Promise.all(jobs).then((results: T[]) => {
      let list: ResultByServer<T>[] = [];
      for (let i = 0; i < SERVERs.length; i++) {
        let item: ResultByServer<T> = {
          servername: SERVERs[i],
          data: results[i],
        }
        list.push(item);
      }
      return list;
    });
  }

  get_check_steps(stationuuid: string): Promise<ResultByServer<DataCheckstep[]>[]> {
    return this.get_all_servers<DataCheckstep[]>('/json/checksteps?uuids=' + stationuuid);
  }
}

export interface ResultByServer<T> {
  servername: string;
  data: T;
}

export interface StationOptions {
  offset: number,
  limit: number,
  countrycode?: string,
  name?: string,
  tagList?: string,
  bitrateMin?: number,
  bitrateMax?: number,
  order?: string,
  reverse?: boolean,
};

function fix_station(station: DataStation): DataStation {
  station.clicktimestamp_iso8601 = station.clicktimestamp_iso8601 ? new Date(station.clicktimestamp_iso8601) : null;
  station.lastchangetime_iso8601 = station.lastchangetime_iso8601 ? new Date(station.lastchangetime_iso8601) : null;
  station.lastcheckoktime_iso8601 = station.lastcheckoktime_iso8601 ? new Date(station.lastcheckoktime_iso8601) : null;
  station.lastchecktime_iso8601 = station.lastchecktime_iso8601 ? new Date(station.lastchecktime_iso8601) : null;
  station.lastlocalchecktime_iso8601 = station.lastlocalchecktime_iso8601 ? new Date(station.lastlocalchecktime_iso8601) : null;
  station.tags_arr = station["tags"].split(',').map(el => el.trim()).filter(el => el !== "");
  return station;
}

function build_check_step_tree<T>(list: any[], parent_uuid: string): any[] {
  let result = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    if (item.parent_stepuuid === parent_uuid) {
      result.push(item);
      item.children = build_check_step_tree<T>(list, item.stepuuid);
    }
  }
  return result;
}
