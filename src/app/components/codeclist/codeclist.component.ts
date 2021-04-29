import { Component, OnInit } from '@angular/core';
import { DataCodec } from 'src/app/data/codec';
import { RadiobrowserService } from 'src/app/services/radiobrowser.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-codeclist',
  templateUrl: './codeclist.component.html',
  styleUrls: ['./codeclist.component.css']
})
export class CodeclistComponent implements OnInit {

  codecs: DataCodec[] = [];

  constructor(private rbservice: RadiobrowserService, private searchservice: SearchService) { }

  getTags(): void {
    this.rbservice.getCodecs("", "stationcount", 100)
      .subscribe(codecs => {
        this.codecs = codecs;
      });
  }

  ngOnInit() {
    this.getTags();
  }

  select(codec: DataCodec) {
    this.searchservice.addoption({
      key: "codec",
      displayName: "codec",
      operator: "=",
      searchValue: codec.name,
      multiValue: false,
    });
  }

}
