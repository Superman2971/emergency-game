import { Component, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { PatientService } from '../../services/patient.service';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-examine-button',
  templateUrl: './examine-button.component.html',
  styleUrls: ['./examine-button.component.scss']
})
export class ExamineButtonComponent implements OnDestroy {
  @Input() deactivate;
  @Output() activation: EventEmitter<boolean> = new EventEmitter();
  active = true;
  progress = 0;
  timeToActive = 1000;
  patients = [];
  openModal = false;
  modalCondition = 'unknown';
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
    if (!this.deactivate && this.patients.length > 0) {
      this.activation.emit(true);
      this.progress = 100;
      // this.purchase();
      this.openEvaluateModal();
      const timer = setInterval(() => {
        this.progress--;
        if (this.progress === 0) {
          clearInterval(timer);
          this.activation.emit(false);
        }
      }, this.timeToActive / 100);
    }
  }

  openEvaluateModal() {
    this.modalCondition = this.patients[0].diagnosedAs;
    this.openModal = true;
  }

  modalResponse(response) {
    console.log('modal response', response);
    this.purchase();
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
