import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from '../../services/broadcaster.service';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-treat-button',
  templateUrl: './treat-button.component.html',
  styleUrls: ['./treat-button.component.scss']
})
export class TreatButtonComponent implements OnInit {
  active = true;
  progress = 0;
  timeToActive = 5000;
  untreatedPatients = [];

  constructor(
    private broadcast: BroadcasterService,
    private stats: StatsService
  ) {}

  ngOnInit() {
    // subscribe to 'treat' changes
    this.broadcast.on('treat').subscribe(response => {
        this.untreatedPatients.push(response);
    });
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
    this.untreatedPatients.shift();
    this.stats.changeMoney(200);
    this.stats.newMessage('Helped treat a patient and sent them home.');
  }
}
