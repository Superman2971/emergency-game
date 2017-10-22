import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from '../services/broadcaster.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  messages = [];
  constructor(private broadcast: BroadcasterService) {}

  ngOnInit() {
    // subscribe to 'newMessage'
    this.broadcast.on('newMessage').subscribe(response => {
      this.messages.push(response);
    });
  }
}
