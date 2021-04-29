import { Component, Input, OnInit } from '@angular/core';
import { RadiobrowserService } from 'src/app/services/radiobrowser.service';
import { SearchService } from 'src/app/services/search.service';

@Component({
  selector: 'app-linklist',
  templateUrl: './linklist.component.html',
  styleUrls: ['./linklist.component.css']
})
export class LinklistComponent implements OnInit {

  link_csv: string;
  link_json: string;
  link_xml: string;
  link_m3u: string;
  link_pls: string;
  link_xspf: string;
  link_ttl: string;

  @Input() link_rel: string;

  constructor(private rbservice: RadiobrowserService, private searchservice: SearchService) { }

  ngOnInit() {
    if (this.link_rel) {
      this.updatelinks(this.link_rel);
    } else {
      this.searchservice.linkOptionsBehaviour.subscribe(query => {
        this.updatelinks("/stations/search?" + query);
      });
    }
  }

  updatelinks(link: string) {
    let SERVER = this.rbservice.getServer();
    this.link_csv = SERVER + "/csv" + link;
    this.link_json = SERVER + "/json" + link;
    this.link_xml = SERVER + "/xml" + link;
    this.link_m3u = SERVER + "/m3u" + link;
    this.link_pls = SERVER + "/pls" + link;
    this.link_xspf = SERVER + "/xspf" + link;
    this.link_ttl = SERVER + "/ttl" + link;
  }
}
