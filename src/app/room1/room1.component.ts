import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from './../services/broadcaster.service';

@Component({
  selector: 'app-room1',
  templateUrl: './room1.component.html',
  styleUrls: ['./room1.component.scss']
})
export class Room1Component implements OnInit {
  testing = this;
  sentText = 1;
  buttons = {
    active: true,
    progress: 0,
    progressInit: function() {
      if (this.active) {
        this.active = false;
        this.progress = 100;
        this.purchase();
        const timer = setInterval(() => {
          this.progress--;
          if (this.progress === 0) {
            clearInterval(timer);
            this.active = true;
          }
        }, this.timeToActive / 100);
      }
    },
    timeToActive: 1000,
    purchase: function() {
      console.log('purchase');
      // this.broadcast.fire('money', -100);
    }
  };

  constructor(private broadcast: BroadcasterService) {}

  ngOnInit() {
    this.broadcast.fire('newMessage', 'A patient comes in asking for help.');
  }

  sendMessage(message) {
    this.broadcast.fire('newMessage', message + ' ' + this.sentText);
    this.sentText++;
  }
}
