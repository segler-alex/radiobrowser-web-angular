import { Component, OnInit } from '@angular/core';
import { RadiobrowserService } from 'src/app/services/radiobrowser.service';
import { SearchService } from 'src/app/services/search.service';
import { DataCountry } from 'src/app/data/country';

@Component({
  selector: 'app-countrylist',
  templateUrl: './countrylist.component.html',
  styleUrls: ['./countrylist.component.css']
})
export class CountrylistComponent implements OnInit {

  countries: DataCountry[] = [];

  constructor(private rbservice: RadiobrowserService, private searchservice: SearchService) { }

  getTags(): void {
    this.rbservice.getCountries("", "stationcount", 100)
      .subscribe(countries => {
        this.countries = countries;
      });
  }

  ngOnInit() {
    this.getTags();
  }

  select(country: DataCountry) {
    this.searchservice.addoption({
      key: "countrycode",
      displayName: "country",
      operator: "=",
      searchValue: country.name,
      multiValue: false,
    });
  }

}
