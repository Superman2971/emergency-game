import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from '../services/broadcaster.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit {
  stats = {
    patients: 2,
    beds: 1,
    otherInfo: 'need lots more'
  };
  constructor(private broadcast: BroadcasterService) {}

  ngOnInit() {
    // subscribe to 'newStats'
    this.broadcast.on('newStats').subscribe(response => {
      console.log(response);
      // this.stats = response;
    });
  }
}
