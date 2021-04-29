import { Component, OnInit } from '@angular/core';
import { DataLanguage } from 'src/app/data/language';
import { RadiobrowserService } from 'src/app/services/radiobrowser.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-languagelist',
  templateUrl: './languagelist.component.html',
  styleUrls: ['./languagelist.component.css']
})
export class LanguagelistComponent implements OnInit {

  languages: DataLanguage[] = [];

  constructor(private rbservice: RadiobrowserService, private searchservice: SearchService) { }

  getTags(): void {
    this.rbservice.getLanguages("", "stationcount", 100)
      .subscribe(languages => {
        this.languages = languages;
      });
  }

  ngOnInit() {
    this.getTags();
  }

  select(language: DataLanguage) {
    this.searchservice.addoption({
      key: "language",
      displayName: "language",
      operator: "=",
      searchValue: language.name,
      multiValue: false,
    });
  }

}
