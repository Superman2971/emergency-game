import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from '../../services/broadcaster.service';

@Component({
  selector: 'app-process-button',
  templateUrl: './process-button.component.html',
  styleUrls: ['./process-button.component.scss']
})
export class ProcessButtonComponent implements OnInit {
  sentText = 1;
  active = true;
  progress = 0;
  timeToActive = 2000;

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
    this.broadcast.fire('money', 150);
    this.sendMessage('Processed patient medications.');
  }
}
