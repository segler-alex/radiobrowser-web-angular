import { Component, OnInit } from '@angular/core';
import { DataStation } from 'src/app/data/station';
import { RadiobrowserService } from 'src/app/services/radiobrowser.service';

@Component({
  selector: 'app-lastchange',
  templateUrl: './lastchange.component.html',
  styleUrls: ['./lastchange.component.css']
})
export class LastchangeComponent implements OnInit {

  stations: DataStation[] = [];

  constructor(private rbservice: RadiobrowserService) { }

  getStations(): void {
    this.rbservice.getStationsLastChange()
      .subscribe(stations => { this.stations = stations; });
  }

  ngOnInit() {
    this.getStations();
  }
}
