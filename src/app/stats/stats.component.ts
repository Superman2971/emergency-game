import { Component, OnDestroy } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnDestroy {
  _subscription;
  _subscription2;
  stats = {
    money: 0,
    patients: 0,
    beds: 1,
    otherInfo: 'need lots more'
  };
  records = [];

  constructor(
    private statsService: StatsService,
    private patientService: PatientService
  ) {
    this._subscription = this.statsService.moneyChange.subscribe((response) => {
      this.stats.money = response;
    });
    this._subscription2 = this.patientService.recordChange.subscribe((response) => {
      this.records = response;
    });
  }

  stop() {
    this.patientService.stop();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this._subscription.unsubscribe();
    this._subscription2.unsubscribe();
  }
}
