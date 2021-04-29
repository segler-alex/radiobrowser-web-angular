import { Component, OnInit } from '@angular/core';
import { DataStation } from 'src/app/data/station';
import { RadiobrowserService } from 'src/app/services/radiobrowser.service';

@Component({
  selector: 'app-topclick',
  templateUrl: './topclick.component.html',
  styleUrls: ['./topclick.component.css']
})
export class TopclickComponent implements OnInit {

  stations: DataStation[] = [];

  constructor(private rbservice: RadiobrowserService) { }

  getStations(): void {
    this.rbservice.getStationsTopClick(100)
      .subscribe(stations => { this.stations = stations; });
  }

  ngOnInit() {
    this.getStations();
  }

}
