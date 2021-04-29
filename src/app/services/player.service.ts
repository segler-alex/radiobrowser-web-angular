import { Injectable } from '@angular/core';
import Hls from 'hls.js';
import { BehaviorSubject } from 'rxjs';
import { DataStation } from '../data/station';

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  private audio = null;
  private hlsObject = null;
  private video = null;

  public active_station: BehaviorSubject<DataStation> = null;
  //public error_subject: BehaviorSubject<string> = null;

  constructor() {
    //this.error_subject = new BehaviorSubject<string>(null);
    this.active_station = new BehaviorSubject<DataStation>(null);
    this.active_station.subscribe(station => this.real_play(station));
  }

  init(video: any) {
    this.video = video;
  }

  play(station: DataStation) {
    this.active_station.next(station);
  }

  stop() {
    this.active_station.next(null);
  }

  private real_play(station: DataStation) {
    this.stopAll();

    if (station) {
      if (station.hls === 0) {
        if (this.audio !== null) {
          this.audio.src = station.url_resolved;
          this.audio.play();
        } else {
          this.audio = new Audio(station.url_resolved);
          this.audio.onplay = () => {
            console.log("play ok");
          };
          this.audio.onerror = err => {
            console.error(err);
            //this.error_subject.next("Error on play:" + err);
          };
          this.audio.play();
        }
      } else if (station.hls === 1) {
        if (Hls.isSupported()) {
          if (!this.hlsObject) {
            this.hlsObject = new Hls();
            this.hlsObject.attachMedia(this.video);
            this.hlsObject.on(Hls.Events.MEDIA_ATTACHED, () => {
              this.hlsObject.loadSource(station.url_resolved);
              this.hlsObject.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
                console.log("manifest loaded, found " + data.levels.length + " quality level");
                this.video.play();
              });
            });
          }
        } else {
          //this.error_subject.next("hls is not supported!");
        }
      }
    }
  }

  private stopAll() {
    //this.error_subject.next(null);
    if (this.audio) {
      this.audio.src = null;
      this.audio = null;
    }
    if (this.hlsObject) {
      this.hlsObject.destroy();
      this.hlsObject = null;
    }
  }
}
