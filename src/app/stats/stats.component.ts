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
  _subscription3;
  stats;
  records = [];
  units = {
    'year': 525600,
    'month': 43200,
    'week': 10080,
    'day': 1440,
    'hour': 60,
    'minute': 1
  };

  constructor(
    private statsService: StatsService,
    private patientService: PatientService
  ) {
    this.stats = this.statsService.stats;
    this._subscription = this.statsService.statsChange.subscribe((response) => {
      this.stats = response;
    });
    this._subscription2 = this.patientService.recordChange.subscribe((response) => {
      this.records = response;
    });
    this._subscription3 = this.patientService.statUpdate.subscribe((response) => {
      if (response.key === 'time') {
        response.value = this.changeToTimeString(response.value * 6);
      } else if (response.key === 'averageTime') {
        response.value = this.changeToTimeString(this.statsService.newDischargeTime(response.value));
      }
      this.statsService.stats[response.key].value = response.value;
      this.statsService.statsChange.next(this.statsService.stats);
    });
  }

  changeToTimeString(value) {
    let result = [];
    for (const name of Object.keys(this.units)) {
      let p =  Math.floor(value / this.units[name]);
      if (p === 1) {
        result.push(p + ' ' + name);
      }
      if (p >= 2) {
        result.push(p + ' ' + name + 's');
      }
      value = value % this.units[name];
    }
    return result.join(' ');
  }

  stop() {
    this.patientService.stop();
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this._subscription.unsubscribe();
    this._subscription2.unsubscribe();
    this._subscription3.unsubscribe();
  }
}
