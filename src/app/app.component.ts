import { Component, OnInit, OnDestroy } from '@angular/core';
import { BroadcasterService } from './services/broadcaster.service';
import { PatientService } from './services/patient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  money = 3000;
  patients = [];
  room = 0;
  _subscription;

  constructor(
    private broadcast: BroadcasterService,
    private patientService: PatientService
  ) {
    // subscribed to patient changes
    this._subscription = patientService.patientsChange.subscribe((value) => {
      console.log('subscribed', value);
      this.patients = value;
    });
  }

  ngOnInit() {
    // start the clock
    this.patientService.startClock();
    // subscribe to 'money' changes
    this.broadcast.on('money').subscribe(response => {
      if (typeof response === 'number') {
        this.money += response;
      }
    });
    // add first new patient
    this.patientService.newPatient();
  }

  roomChange(direction) {
    if (direction === 'back' && this.room > 0) {
      this.room--;
    } else if (direction === 'forward' && this.room < 2) {
      this.room++;
    }
  }

  ngOnDestroy() {
    // prevent memory leak when component destroyed
    this._subscription.unsubscribe();
  }
}
