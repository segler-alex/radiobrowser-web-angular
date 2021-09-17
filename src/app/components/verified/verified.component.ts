import { Component, OnInit } from '@angular/core';
import { DataStation } from 'src/app/data/station';
import { RadiobrowserService } from 'src/app/services/radiobrowser.service';

@Component({
  selector: 'app-verified',
  templateUrl: './verified.component.html',
  styleUrls: ['./verified.component.css']
})
export class VerifiedComponent implements OnInit {

  stations: DataStation[] = [];

  constructor(private rbservice: RadiobrowserService) { }

  getStations(): void {
    this.rbservice.getStationsVerified()
      .subscribe(stations => { this.stations = stations; });
  }

  ngOnInit() {
    this.getStations();
  }

}
