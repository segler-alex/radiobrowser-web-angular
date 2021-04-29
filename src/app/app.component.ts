import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { OperatorFunction, Observable, of, merge } from 'rxjs';
import { catchError, debounceTime, distinctUntilChanged, map, scan, switchMap, tap } from 'rxjs/operators';
import { SearchOption } from './data/search-option';
import { RadiobrowserService } from './services/radiobrowser.service';
import { RestcountriesService } from './services/restcountries.service';
import { SearchService } from './services/search.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public isMenuCollapsed = true;
  public searching: boolean = false;

  constructor(
    private restcountries: RestcountriesService,
    private radiobrowser: RadiobrowserService,
    private searchservice: SearchService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  getTags(term: string, max: number = 5): Observable<SearchOption[]> {
    return this.radiobrowser.getTags(term, "stationcount", max).pipe(
      map(items => items.slice(0, max).map(item => {
        return {
          key: 'tagList',
          displayName: 'tag',
          operator: '=',
          searchValue: item.name,
          multiValue: true,
        };
      })),
    )
  }

  getLanguages(term: string, max: number = 5): Observable<SearchOption[]> {
    return this.radiobrowser.getLanguages(term, "stationcount", max).pipe(
      map(items => items.slice(0, max).map(item => {
        return {
          key: 'language',
          displayName: 'language',
          operator: '=',
          searchValue: item.name,
          multiValue: false,
        };
      })),
    )
  }

  getCodecs(term: string, max: number = 5): Observable<SearchOption[]> {
    return this.radiobrowser.getCodecs(term, "stationcount", max).pipe(
      map(items => items.slice(0, max).map(item => {
        return {
          key: 'codec',
          displayName: 'codec',
          operator: '=',
          searchValue: item.name,
          multiValue: false,
        };
      })),
    )
  }

  getCountries(term: string, max: number = 5): Observable<SearchOption[]> {
    //return this.radiobrowser.getCountries(term, "stationcount").pipe(
    return this.restcountries.getCountries(term).pipe(
      map(items => items.slice(0, max).map(item => {
        return {
          key: 'countrycode',
          displayName: 'country',
          operator: '=',
          searchValue: item.alpha2Code,
          displayValue: item.name,
          multiValue: false,
        };
      })),
      catchError(() => {
        return of([]);
      }),
    )
  }

  getGeneric(key: string, displayName: string, operator: string, term: any): Observable<SearchOption[]> {
    if (term) {
      return of([{
        key,
        displayName,
        operator,
        searchValue: term,
        multiValue: false,
      }]);
    } else {
      return of([]);
    }
  }

  selected(item) {
    this.searchservice.addoption(item.item);
  }

  search: OperatorFunction<string, readonly SearchOption[]> = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      tap(() => this.searching = true),
      switchMap(term => term.length < 2 ? of([]) :
        merge(
          this.getGeneric("name", "name", "~=", term),
          this.getGeneric("bitrateMin", "bitrate", ">=", parseInt(term)),
          this.getGeneric("bitrateMax", "bitrate", "<=", parseInt(term)),
          this.getTags(term),
          this.getCodecs(term),
          this.getLanguages(term),
          this.getCountries(term),
        ).pipe(
          scan((total, addition) => total.concat(addition), []),
        )
      ),
      /*
      tap(() => this.searchFailed = false),
      catchError(() => {
        this.searchFailed = true;
        return of([]);
      }),
      */
      tap(() => this.searching = false),
    )

  formatter = (x: { searchValue: string, displayName: string }) => "";
}
