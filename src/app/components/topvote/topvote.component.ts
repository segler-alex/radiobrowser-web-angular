import { Component, OnInit } from '@angular/core';
import { DataStation } from 'src/app/data/station';
import { RadiobrowserService } from 'src/app/services/radiobrowser.service';

@Component({
  selector: 'app-topvote',
  templateUrl: './topvote.component.html',
  styleUrls: ['./topvote.component.css']
})
export class TopvoteComponent implements OnInit {

  stations: DataStation[] = [];

  constructor(private rbservice: RadiobrowserService) { }

  getStations(): void {
    this.rbservice.getStationsTopVote()
      .subscribe(stations => { this.stations = stations; });
  }

  ngOnInit() {
    this.getStations();
  }

}
