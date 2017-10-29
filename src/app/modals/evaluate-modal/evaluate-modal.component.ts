import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-evaluate-modal',
  templateUrl: './evaluate-modal.component.html',
  styleUrls: ['./evaluate-modal.component.scss']
})
export class EvaluateModalComponent {
  @Input() active;
  @Output() closed: EventEmitter<boolean> = new EventEmitter();
  @Input() condition;
  @Output() response: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  submit(value) {
    this.active = false;
    this.closed.emit(false);
    this.response.emit(value);
  }
}
