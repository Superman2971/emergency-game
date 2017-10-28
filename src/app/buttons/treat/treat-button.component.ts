import { Component, OnDestroy } from '@angular/core';
// import { StatsService } from '../../services/stats.service';
import { PatientService } from '../../services/patient.service';

@Component({
  selector: 'app-treat-button',
  templateUrl: './treat-button.component.html',
  styleUrls: ['./treat-button.component.scss']
})
export class TreatButtonComponent implements OnDestroy {
  active = true;
  progress = 0;
  timeToActive = 5000;
  patients = [];
  _subscription;

  constructor(
    // private stats: StatsService
    private patientService: PatientService
  ) {
    // subscribed to patient changes
    this._subscription = patientService.patientsAwaitingTreatmentChange.subscribe((value) => {
      this.patients = value;
    });
  }

  progressInit() {
    if (this.active && this.patients.length > 0) {
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
    let patient = this.patients.shift();
    if (patient.timeoutId) {
      clearTimeout(patient.timeoutId);
      patient.timeoutId = null;
    }
    if (patient.treatTimeoutId) {
      clearTimeout(patient.treatTimeoutId);
      patient.treatTimeoutId = null;
    }
    this.patientService.treated(patient);
    // this.stats.changeMoney(200);
    this.patientService.newPatientMessage.next(`Helped treat ${patient.condition} and sent them home.`);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
