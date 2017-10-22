import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from './../services/broadcaster.service';

@Component({
  selector: 'app-room1',
  templateUrl: './room1.component.html',
  styleUrls: ['./room1.component.scss']
})
export class Room1Component implements OnInit {
  sentText = 1;

  constructor(private broadcast: BroadcasterService) {}

  ngOnInit() {
    this.broadcast.fire('newMessage', 'test run');
  }

  sendMessage() {
    this.broadcast.fire('newMessage', 'test run ' + this.sentText);
    this.sentText++;
  }
}
