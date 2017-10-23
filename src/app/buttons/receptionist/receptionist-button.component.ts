import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from '../../services/broadcaster.service';

@Component({
  selector: 'app-receptionist-button',
  templateUrl: './receptionist-button.component.html',
  styleUrls: ['./receptionist-button.component.scss']
})
export class ReceptionistButtonComponent implements OnInit {
  sentText = 1;
  active = true;
  progress = 0;
  timeToActive = 1000;

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
    this.broadcast.fire('money', -100);
    this.sendMessage('Hire a new Receptionist');
  }
}
