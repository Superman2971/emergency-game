import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from './services/broadcaster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  room1 = false;
  money = 3000;
  patients = 0;
  room = 0;

  constructor(private broadcast: BroadcasterService) {}

  ngOnInit() {
    // subscribe to 'money' changes
    this.broadcast.on('money').subscribe(response => {
      if (typeof response === 'number') {
        this.money += response;
      }
    });
    this.newPatient();
  }

  newPatient() {
    setTimeout(() => {
      this.patients++;
      if (this.patients < 10) {
        this.newPatient();
      }
    }, this.randomTime(3000, 7000));
  }

  randomTime(min, max) {
    return Math.floor(Math.random() * max) + 1 + min;
  }

  roomChange(direction) {
    if (direction === 'back' && this.room > 0) {
      this.room--;
    } else if (direction == 'forward' && this.room < 2) {
      this.room++;
    }
  }
}
