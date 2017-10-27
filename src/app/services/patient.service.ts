import { Subject } from 'rxjs/Subject';

export class PatientService {

  patientsChange: Subject<any[]> = new Subject<any[]>();
  removedPatient: Subject<{}> = new Subject<{}>();
  patientLeft: Subject<string> = new Subject<string>();
  patients = [];
  patientCount = 0;
  time = 0;
  conditions = [
    {name: 'cold', level: 1},
    {name: 'fever', level: 3},
    {name: 'broken leg', level: 5},
    {name: 'head wound', level: 8},
    {name: 'internal bleeding', level: 8},
    {name: 'gun shot', level: 10}
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
        condition: null,
        difficulty: null,
        arrivalTime: this.time,
        diagnosed: false,
        treated: false,
        processed: false,
        released: false,
        alive: true,
        timeoutId: null,
        treatTimeoutId: null
      };
      const condition = this.randomCondition();
      newPatient.condition = condition.name;
      newPatient.difficulty = condition.level;
      newPatient.timeoutId = this.createTimeout(newPatient, this.numberBetween(20000, 40000));
      // newPatient.treatTimeoutId = this.createTimeout(newPatient,
      //   this.numberBetween((100000 / newPatient.difficulty), (200000 / newPatient.difficulty))); ////  NOTE TO MAKE THIS WORK NEED TO MAKE NEW CREATE TIMEOUT SO IT DOESNT USE THE SAME REMOVE PATIENT FUNCTION
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
