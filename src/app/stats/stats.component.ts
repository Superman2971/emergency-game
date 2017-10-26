import { Component, OnInit, OnDestroy } from '@angular/core';
import { BroadcasterService } from '../services/broadcaster.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})

export class StatsComponent implements OnInit, OnDestroy {
  _subscription;
  stats = {
    money: 0,
    patients: 0,
    beds: 1,
    otherInfo: 'need lots more'
  };
  constructor(
    private broadcast: BroadcasterService,
    private patientService: PatientService
  ) {
    this._subscription = this.patientService.patientsChange.subscribe((response) => {
      this.stats.patients = response.length;
    });
  }

  ngOnInit() {
    // subscribe to 'newStats'
    this.broadcast.on('newStats').subscribe(response => {
      console.log('newStats', response);
      // this.stats = response;
    });
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this._subscription.unsubscribe();
  }
}
