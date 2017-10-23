import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from '../../services/broadcaster.service';

@Component({
  selector: 'app-crisis-button',
  templateUrl: './crisis-button.component.html',
  styleUrls: ['./crisis-button.component.scss']
})
export class CrisisButtonComponent implements OnInit {
  sentText = 1;
  active = true;
  progress = 0;
  timeToActive = 9000;

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
    this.broadcast.fire('money', 900);
    this.sendMessage('Crisis has been averted.');
  }
}
