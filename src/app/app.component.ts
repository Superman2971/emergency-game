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

  constructor(private broadcast: BroadcasterService) {}

  ngOnInit() {
    // subscribe to 'money' changes
    this.broadcast.on('money').subscribe(response => {
      if (typeof response === 'number') {
        this.money += response;
      }
    });
  }
}
