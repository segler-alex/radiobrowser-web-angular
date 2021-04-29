import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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
    return this.http.get<Country>('https://restcountries.eu/rest/v2/alpha/' + code);
  }

  getCountries(term: string): Observable<Country[]> {
    return this.http.get<Country[]>('https://restcountries.eu/rest/v2/name/' + term);
  }
}
