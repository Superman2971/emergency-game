import { Subject } from 'rxjs/Subject';

export class PatientService {

  patientsChange: Subject<any[]> = new Subject<any[]>();
  removedPatient: Subject<{}> = new Subject<{}>();
  patientLeft: Subject<string> = new Subject<string>();
  patients = [];
  patientCount = 0;
  time = 0;
  conditions = [
    'cold',
    'fever',
    'broken leg',
    'head wound',
    'internal bleeding',
    'cancer'
  ];
  waitingRoomCapacity = 4;

  constructor() {}

  startClock() {
    setInterval(() => {
      this.time++;
    }, 1000);
  }

  newPatient(min?, max?) {
    this.patientCount++;
    // use setTimeout to randomize the time to newPatient
    setTimeout(() => {
      let newPatient = {
        id: this.patientCount,
        condition: this.randomCondition(),
        arrivalTime: this.time,
        diagnosed: false,
        treated: false,
        processed: false,
        released: false,
        alive: true,
        timeoutId: null
      };
      newPatient.timeoutId = this.createTimeout(newPatient, this.numberBetween(20000, 40000));
      // add another patient
      this.patients.push(newPatient);
      if (this.patients.length > this.waitingRoomCapacity) {
        let patient = this.patients.shift();
        if (patient.timeoutId) {
          clearTimeout(patient.timeoutId);
          patient.timeoutId = null;
        }
        this.removedPatient.next(patient);
      }
      // conduct a loop through the current patients
      // HERE
      // send patients to subscribed components
      this.patientsChange.next(this.patients);
      this.newPatient();
    }, this.numberBetween(min || 3000, max || 7000));
  }

  randomCondition() {
    const selectedCondition = this.numberBetween(0, this.conditions.length - 1);
    return this.conditions[selectedCondition];
  }

  numberBetween(min, max) {
    return Math.floor(Math.random() * max) + 1 + min;
  }

  createTimeout(patient, patientLife?): any {
    let task: number;
      task = setTimeout(() => {
        this.removePatient(patient);
      }, (patientLife || 30000));
    return task;
  }

  removePatient(patient) {
    this.patientLeft.next('Patient could wait no longer and left');
    if (patient.timeoutId) {
      clearTimeout(patient.timeoutId);
      patient.timeoutId = null;
    }
    // using filter on the patient.id to remove this patient
    this.patients = this.patients.filter((t) => {
      return t.id !== patient.id;
    });
  }
}
