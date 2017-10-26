import { Component, OnInit } from '@angular/core';
import { StatsService } from '../services/stats.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-story',
  templateUrl: './story.component.html',
  styleUrls: ['./story.component.scss']
})
export class StoryComponent implements OnInit {
  messages = [];
  _subscription;
  _subscription2;

  constructor(
    private patientService: PatientService,
    private stats: StatsService
  ) {
    // subscribed to patient changes
    this._subscription = stats.messagesChange.subscribe((message) => {
      this.messages.push(message);
      if (this.messages.length > 20) {
        this.messages.shift();
      }
    });
    // subscribed to patient changes
    this._subscription2 = patientService.patientLeft.subscribe((message) => {
      this.messages.push(message);
      if (this.messages.length > 20) {
        this.messages.shift();
      }
    });
  }

  ngOnInit() {
    // initialize the story
    this.messages.push('You are alone in a small urgent care facility.');
    setTimeout(() => {
      this.messages.push('There is only $200 in your account.');
    }, 1000);
  }
}
