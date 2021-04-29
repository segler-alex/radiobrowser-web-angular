import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { DataStation } from 'src/app/data/station';
import { PlayerService } from '../../services/player.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements AfterViewInit {

  public station: DataStation = null;
  //public error: string = null;

  constructor(public player: PlayerService) { }

  @ViewChild('video') video_element: ElementRef;

  ngAfterViewInit(): void {
    this.player.init(this.video_element.nativeElement);
    //this.player.error_subject.subscribe(error => this.error = error);
    this.player.active_station.subscribe(station => this.station = station);
  }
}
