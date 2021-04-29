import { Component, OnInit } from '@angular/core';
import { DataTag } from 'src/app/data/tag';
import { RadiobrowserService } from 'src/app/services/radiobrowser.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-taglist',
  templateUrl: './taglist.component.html',
  styleUrls: ['./taglist.component.css']
})
export class TaglistComponent implements OnInit {

  tags: DataTag[] = [];

  constructor(private rbservice: RadiobrowserService, private searchservice: SearchService) { }

  getTags(): void {
    this.rbservice.getTags("", "stationcount", 100)
      .subscribe(tags => {
        this.tags = tags;
      });
  }

  ngOnInit() {
    this.getTags();
  }

  select(tag: DataTag) {
    this.searchservice.addoption({
      key: "tagList",
      displayName: "tag",
      operator: "has",
      searchValue: tag.name,
      multiValue: true,
    });
  }
}
