import { Subject } from 'rxjs/Subject';

export class PatientService {

  patientsChange: Subject<any[]> = new Subject<any[]>();
  patients = [];
  time = 0;
  conditions = [
    'cold',
    'fever',
    'broken leg',
    'head wound',
    'internal bleeding',
    'cancer'
  ];

  constructor() {}

  startClock() {
    setInterval(() => {
      this.time++;
    }, 1000);
  }

  newPatient() {
    // add another patient
    setTimeout(() => {
      this.patients.push({
        condition: this.randomCondition(),
        arrivalTime: this.time,
        diagnosed: false,
        treated: false,
        processed: false,
        released: false,
        alive: true
      });
      // this.broadcast.fire('newMessage', 'A patient walks in with ' + this.patients[this.patients.length - 1].condition);
      if (this.patients.length < 10) {
        this.newPatient();
      }
    }, this.numberBetween(3000, 7000));
    // conduct a loop through the current patients
    // HERE
    // send patients to subscribed components
    this.patientsChange.next(this.patients);
  }

  randomCondition() {
    const selectedCondition = this.numberBetween(0, this.conditions.length - 1);
    return this.conditions[selectedCondition];
  }

  numberBetween(min, max) {
    return Math.floor(Math.random() * max) + 1 + min;
  }
}
