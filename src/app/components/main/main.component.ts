import { Component, OnInit } from '@angular/core';
import { DataServerStats } from 'src/app/data/server-stats';
import { RadiobrowserService } from 'src/app/services/radiobrowser.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

  stats: DataServerStats = null;

  constructor(private rbservice: RadiobrowserService) { }

  getStations(): void {
    this.rbservice.getStats()
      .subscribe(stats => { this.stats = stats; });
  }

  ngOnInit() {
    this.getStations();
  }

}
