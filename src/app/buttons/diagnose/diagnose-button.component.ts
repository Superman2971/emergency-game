import { Component, OnInit } from '@angular/core';
import { BroadcasterService } from '../../services/broadcaster.service';
import { PatientService } from '../../services/patient.service';
import { StatsService } from '../../services/stats.service';

@Component({
  selector: 'app-diagnose-button',
  templateUrl: './diagnose-button.component.html',
  styleUrls: ['./diagnose-button.component.scss']
})
export class DiagnoseButtonComponent implements OnInit {
  sentText = 1;
  active = true;
  progress = 0;
  timeToActive = 1000;
  undiagnosedPatients = [];
  _subscription;
  _subscription2;

  constructor(
    private broadcast: BroadcasterService,
    private patientService: PatientService,
    private stats: StatsService
  ) {
    // subscribed to patient changes
    this._subscription = patientService.patientsChange.subscribe((value) => {
      this.undiagnosedPatients = value;
      if (this.undiagnosedPatients.length > 0) {
        // this.broadcast.fire('newMessage', 'A patient has arrived');
        this.stats.newMessage('A patient has arrived');
      }
    });
    // subscribed to removed a patient
    this._subscription2 = patientService.removedPatient.subscribe((patient: any) => {
      // this.broadcast.fire('newMessage', `Too many patients in waiting room.
      // A patient with ${patient.condition} got fed up and left.`);
      this.stats.newMessage(`Too many patients in waiting room.
       A patient with ${patient.condition} got fed up and left.`);
    });
  }

  ngOnInit() {
    // subscribe to 'diagnose' changes
    this.broadcast.on('diagnose').subscribe(response => {
      this.undiagnosedPatients.push(response);
    });
  }

  progressInit() {
    if (this.active && this.undiagnosedPatients.length > 0) {
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
    let patient = this.undiagnosedPatients.shift();
    if (patient.timeoutId) {
      clearTimeout(patient.timeoutId);
      patient.timeoutId = null;
    }
    this.broadcast.fire('treat', patient);
    this.stats.changeMoney(-50);
    this.stats.newMessage(`Completed diagnosis for patient with ${patient.condition}`);
  }
}
