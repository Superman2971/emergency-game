import { Component, OnInit, OnDestroy } from '@angular/core';
import { PatientService } from './services/patient.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit, OnDestroy {
  room = 0;
  _subscription;

  constructor(
    private patientService: PatientService
  ) {}

  ngOnInit() {
    // start the clock
    this.patientService.startClock();
    // add first new patient
    this.patientService.newPatient(2000, 2000);
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
