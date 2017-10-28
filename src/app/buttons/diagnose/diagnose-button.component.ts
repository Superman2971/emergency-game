import { Component, OnDestroy } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-diagnose-button',
  templateUrl: './diagnose-button.component.html',
  styleUrls: ['./diagnose-button.component.scss']
})
export class DiagnoseButtonComponent implements OnDestroy {
  sentText = 1;
  active = true;
  progress = 0;
  timeToActive = 1000;
  patients = [];
  _subscription;

  constructor(
    private patientService: PatientService,
    private stats: StatsService
  ) {
    // subscribed to patient changes
    this._subscription = patientService.patientsAwaitingDiagnosisChange.subscribe((value) => {
      this.patients = value;
      if (this.patients.length > 0) {
        this.patientService.newPatientMessage.next('A new patient has arrived');
      }
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
    this.patientService.sendForTreatment(patient);
    this.stats.changeMoney(-50);
    this.patientService.newPatientMessage.next(`Completed diagnosis for patient with ${patient.condition}`);
  }

  ngOnDestroy() {
    this._subscription.unsubscribe();
  }
}
