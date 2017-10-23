import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from '../../services/broadcaster.service';

@Component({
  selector: 'app-wing-button',
  templateUrl: './wing-button.component.html',
  styleUrls: ['./wing-button.component.scss']
})
export class WingButtonComponent implements OnInit {
  sentText = 1;
  active = true;
  progress = 0;
  timeToActive = 30000;

  constructor(private broadcast: BroadcasterService) {}

  ngOnInit() {}

  sendMessage(message) {
    this.broadcast.fire('newMessage', message + ' ' + this.sentText);
    this.sentText++;
  }


  progressInit() {
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
  }

  purchase() {
    this.broadcast.fire('money', -2000);
    this.sendMessage('New Wing for the hospital created.');
  }
}
