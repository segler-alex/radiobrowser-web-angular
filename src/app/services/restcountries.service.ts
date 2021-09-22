import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { from, Observable } from 'rxjs';
import countries from 'world-countries';

export interface Country{
  name: string;
  nativeName: string;
  alpha2Code: string;
  latlng: number[];
}

@Injectable({
  providedIn: 'root'
})
export class RestcountriesService {

  constructor(private http: HttpClient) { }

  getCountryByCode(code: string): Observable<Country> {
    for ( let country of countries ){
      if (code === country.cca2){
        return from([{
          name: country.name.common,
          alpha2Code: country.cca2,
          latlng: country.latlng,
          nativeName: "",
        }]);
      }
    }
    return from([]);
  }

  getCountries(term: string): Observable<Country[]> {
    let list = [];
    for ( let country of countries ){
      if (country.name.common.toLowerCase().indexOf(term.toLowerCase()) >= 0){
        let c: Country = {
          name: country.name.common,
          alpha2Code: country.cca2,
          latlng: country.latlng,
          nativeName: "",
        }
        list.push(c);
      }
    }
    return from([list]);
  }
}
