import { Injectable } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras, Params } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { SearchOption } from '../data/search-option';
import { RadiobrowserService, StationOptions } from './radiobrowser.service';

@Injectable({
  providedIn: 'root'
})
export class SearchService {

  private displayOptions: SearchOption[] = [];
  private searchOptions: StationOptions = null;

  private page: number = 1;
  public linkOptionsBehaviour: BehaviorSubject<string> = new BehaviorSubject<string>("");
  public displayOptionsBehaviour: BehaviorSubject<SearchOption[]> = new BehaviorSubject<SearchOption[]>([]);
  public searchOptionsBehaviour: BehaviorSubject<StationOptions> =
    new BehaviorSubject<StationOptions>(params_to_search_options({}, this.page));

  constructor(
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.route.queryParams.subscribe(params => {
      console.log("params:", params);
      this.page = params['page'] || 1;
      this.searchOptions = params_to_search_options(params, this.page);
      this.searchOptionsBehaviour.next(this.searchOptions);
      this.displayOptions = params_to_display_options(params);
      this.displayOptionsBehaviour.next(this.displayOptions);
      this.linkOptionsBehaviour.next(this.options_to_query_str());
    });
  }

  addoption(option_new: SearchOption) {
    if (!option_new.multiValue) {
      for (let i = 0; i < this.displayOptions.length; i++) {
        let option = this.displayOptions[i];
        if (option_new.key === option.key) {
          this.displayOptions.splice(i, 1);
          break;
        }
      }
    }
    this.displayOptions.push(option_new);
    this.page = 1;
    this.router.navigate(['/search'], options_to_query(this.displayOptions, this.page));
  }

  removeoption(key: string, value: string) {
    for (let i = 0; i < this.displayOptions.length; i++) {
      let option = this.displayOptions[i];
      if (option.key === key && option.searchValue === value) {
        this.displayOptions.splice(i, 1);
        break;
      }
    }
    this.page = 1;
    this.router.navigate(['/search'], options_to_query(this.displayOptions, this.page));
  }

  nextpage() {
    this.page++;
    this.router.navigate(['/search'], options_to_query(this.displayOptions, this.page));
  }

  prevpage() {
    if (this.page > 1){
      this.page--;
      this.router.navigate(['/search'], options_to_query(this.displayOptions, this.page));
    }
  }

  options_to_query_str(): string {
    return options_to_query_str(this.searchOptions);
  }
}

function params_to_search_options(params: Params, page: number): any {
  let page_size = 10;
  return {
    offset: (page - 1) * page_size,
    limit: page_size,
    name: params['name'],
    countrycode: params['countrycode'],
    codec: params['codec'],
    language: params['language'],
    bitrateMin: params['bitrateMin'],
    bitrateMax: params['bitrateMax'],
    tagList: params['tagList'],
    hidebroken: true,
    order: "clickcount",
    reverse: true,
  };
}

function params_to_display_options(params: Params): SearchOption[] {
  let list = [];

  if (params['name']) {
    list.push({
      key: 'name',
      displayName: "name",
      operator: "~=",
      searchValue: params['name'],
      multiValue: false,
    });
  }
  if (params['tagList']) {
    for (let tag of params['tagList'].split(',')) {
      if (tag) {
        list.push({
          key: 'tagList',
          displayName: "tags",
          operator: "has",
          searchValue: tag,
          multiValue: true,
        });
      }
    }
  }
  if (params['countrycode']) {
    list.push({
      key: 'countrycode',
      displayName: "country",
      operator: "=",
      searchValue: params['countrycode'],
      multiValue: false,
    });
  }
  if (params['codec']) {
    list.push({
      key: 'codec',
      displayName: "codec",
      operator: "=",
      searchValue: params['codec'],
      multiValue: false,
    });
  }
  if (params['language']) {
    list.push({
      key: 'language',
      displayName: "language",
      operator: "=",
      searchValue: params['language'],
      multiValue: false,
    });
  }
  if (params['bitrateMin']) {
    list.push({
      key: 'bitrateMin',
      displayName: "bitrate",
      operator: ">=",
      searchValue: params['bitrateMin'],
      multiValue: false,
    });
  }
  if (params['bitrateMax']) {
    list.push({
      key: 'bitrateMax',
      displayName: "bitrate",
      operator: "<=",
      searchValue: params['bitrateMax'],
      multiValue: false,
    });
  }

  return list;
}

function options_to_query(options: SearchOption[], page: number): NavigationExtras {
  let extras: NavigationExtras = {
    queryParams: {
      page,
    },
  };
  for (let i = 0; i < options.length; i++) {
    let option = options[i];
    if (option.multiValue) {
      if (!extras.queryParams[option.key]) {
        extras.queryParams[option.key] = option.searchValue;
      } else {
        extras.queryParams[option.key] += "," + option.searchValue;
      }
    } else {
      extras.queryParams[option.key] = option.searchValue;
    }
  }
  return extras;
}

function options_to_query_str(options: any): string {
  let output = "";
  for (const [key, value] of Object.entries(options)) {
    if (value) {
      if (output) {
        output = output + "&";
      }
      output = output + `${key}=${encodeURIComponent("" + value)}`;
    }
  }
  return output;
}
