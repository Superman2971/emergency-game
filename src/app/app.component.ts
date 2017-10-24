import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from './services/broadcaster.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  time = 0;
  room1 = false;
  money = 3000;
  patients = [];
  room = 0;
  conditions = [
    'cold',
    'fever',
    'broken leg',
    'head wound',
    'internal bleeding',
    'cancer'
  ];

  constructor(private broadcast: BroadcasterService) {}

  ngOnInit() {
    this.startClock();
    // subscribe to 'money' changes
    this.broadcast.on('money').subscribe(response => {
      if (typeof response === 'number') {
        this.money += response;
      }
    });
    this.newPatient();
  }

  startClock() {
    setInterval(() => {
      this.time++;
    }, 1000);
  }

  newPatient() {
    setTimeout(() => {
      this.patients.push({
        condition: this.randomCondition(),
        waitingTime: this.time,
        diagnosed: false,
        treated: false,
        processed: false,
        released: false,
        alive: true
      });
      this.broadcast.fire('newMessage', 'A patient walks in with ' + this.patients[this.patients.length - 1].condition);
      if (this.patients.length < 10) {
        this.newPatient();
        console.log(this.patients);
      }
    }, this.numberBetween(3000, 7000));
  }

  randomCondition() {
    const selectedCondition = this.numberBetween(0, this.conditions.length - 1);
    return this.conditions[selectedCondition];
  }

  numberBetween(min, max) {
    return Math.floor(Math.random() * max) + 1 + min;
  }

  roomChange(direction) {
    if (direction === 'back' && this.room > 0) {
      this.room--;
    } else if (direction === 'forward' && this.room < 2) {
      this.room++;
    }
  }
}
