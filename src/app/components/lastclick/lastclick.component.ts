import { Component, OnInit } from '@angular/core';
import { DataStation } from 'src/app/data/station';
import { RadiobrowserService } from 'src/app/services/radiobrowser.service';

@Component({
  selector: 'app-lastclick',
  templateUrl: './lastclick.component.html',
  styleUrls: ['./lastclick.component.css']
})
export class LastclickComponent implements OnInit {

  stations: DataStation[] = [];

  constructor(private rbservice: RadiobrowserService) { }

  getStations(): void {
    this.rbservice.getStationsLastClick()
      .subscribe(stations => { this.stations = stations; });
  }

  ngOnInit() {
    this.getStations();
  }

}
