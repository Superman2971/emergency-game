import { Subject } from 'rxjs/Subject';

export class PatientService {

  stopthis;
  // records
  statUpdate: Subject<any> = new Subject<any>();
  recordChange: Subject<any[]> = new Subject<any[]>();
  records = [];
  // messages
  newPatientMessage: Subject<string> = new Subject<string>();
  // patients
  patientsAwaitingDiagnosis = [];
  patientsAwaitingDiagnosisChange: Subject<any[]> = new Subject<any[]>();
  patientsAwaitingTreatment = [];
  patientsAwaitingTreatmentChange: Subject<any[]> = new Subject<any[]>();
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
  // events
  events = [{
    name: 'knife attack',
    text: `A deranged ${this.randomSex()} came in and attacked with his knife`
  }, {
    name: 'gun attack',
    text: `A deranged ${this.randomSex()} came in and attacked with his gun`
  }, {
    name: 'homeless person',
    text: `A deranged ${this.randomSex()} homeless person yelled at everyoe`
  }];
  eventSuccess: Subject<any> = new Subject<any>();
  chanceOfEvent = 0.9;

  constructor() {}

  startClock() {
    setInterval(() => {
      this.time++;
      this.statUpdate.next({
        key: 'time',
        value: this.time
      });
      if (this.time % 240 === 0) {
        this.newEvent();
      }
    }, 1000);
  }

  stop() {
    this.stopthis = true;
  }

  newPatient(min?, max?) {
    if (this.stopthis) {
      return;
    }
    this.patientCount++;
    // use setTimeout to randomize the time to newPatient
    setTimeout(() => {
      let newPatient = {
        id: this.patientCount,
        condition: null,
        difficulty: null,
        arrivalTime: this.time,
        diagnosedAs: this.randomCondition().name,
        // diagnosed: false,
        // treated: false,
        // processed: false,
        // released: false,
        // alive: true,
        timeoutId: null,
        treatTimeoutId: null
      };
      const condition = this.randomCondition();
      newPatient.condition = condition.name;
      newPatient.difficulty = condition.level;
      newPatient.timeoutId = this.createTimeout(newPatient, this.numberBetween(20000, 40000), 'diagnoseTimeout');
      newPatient.treatTimeoutId = this.createTimeout(newPatient,
        this.numberBetween((200000 / newPatient.difficulty), (400000 / newPatient.difficulty)), 'treatmentTimeout');
      // add another patient
      this.patientsAwaitingDiagnosis.push(newPatient);
      if (this.patientsAwaitingDiagnosis.length > this.waitingRoomCapacity) {
        let patient = this.patientsAwaitingDiagnosis.shift();
        if (patient.timeoutId) {
          clearTimeout(patient.timeoutId);
          patient.timeoutId = null;
        }
        if (patient.treatTimeoutId) {
          clearTimeout(patient.treatTimeoutId);
          patient.treatTimeoutId = null;
        }
        this.newRecord(`Patient ${patient.id} left. Waiting room full.`);
        this.newPatientMessage.next(`Too many in waiting room. Patient with ${patient.condition} got fed up and left.`);
      }
      // conduct a loop through the current patients
      // HERE
      // send patients to subscribed components
      this.patientsAwaitingDiagnosisChange.next(this.patientsAwaitingDiagnosis);
      this.newPatient();
    }, this.numberBetween(min || 3000, max || 7000));
  }

  randomSex() {
    return Math.random() > 0.5 ? 'female' : 'male';
  }

  randomCondition() {
    const selectedCondition = this.numberBetween(0, this.conditions.length - 1);
    return this.conditions[selectedCondition];
  }

  numberBetween(min, max) {
    return Math.floor(Math.random() * max) + 1 + min;
  }

  createTimeout(patient, patientLife, reason): any {
    let task: number;
      task = setTimeout(() => {
        this.removePatient(patient, reason);
      }, (patientLife || 30000));
    return task;
  }

  removePatient(patient, reason) {
    // remove timeouts
    if (patient.timeoutId) {
      clearTimeout(patient.timeoutId);
      patient.timeoutId = null;
    }
    if (patient.treatTimeoutId) {
      clearTimeout(patient.treatTimeoutId);
      patient.treatTimeoutId = null;
    }
    // handle based on reason
    if (reason === 'diagnoseTimeout') {
      this.newRecord(`Patient ${patient.id} left. Never diagnosed.`);
      this.newPatientMessage.next('Patient could wait no longer and left. If condition was serious, LAWSUIT.');
      // using filter on the patient.id to remove this patient
      this.patientsAwaitingDiagnosis = this.patientsAwaitingDiagnosis.filter((t) => {
        return t.id !== patient.id;
      });
      this.patientsAwaitingDiagnosisChange.next(this.patientsAwaitingDiagnosis);
    } else if (reason === 'treatmentTimeout') {
      this.newRecord(`Patient ${patient.id} died. Never treated.`);
      this.newPatientMessage.next('Patient died due to lack of treatment. Lawsuit inbound!!!');
      // using filter on the patient.id to remove this patient
      this.patientsAwaitingTreatment = this.patientsAwaitingTreatment.filter((t) => {
        return t.id !== patient.id;
      });
      // need to also filter awaiting as it may be there
      this.patientsAwaitingDiagnosis = this.patientsAwaitingDiagnosis.filter((t) => {
        return t.id !== patient.id;
      });
      this.patientsAwaitingTreatmentChange.next(this.patientsAwaitingTreatment);
    }
  }

  sendForTreatment(patient) {
    this.patientsAwaitingTreatment.push(patient);
    this.patientsAwaitingTreatmentChange.next(this.patientsAwaitingTreatment);
  }

  treated(patient) {
    this.statUpdate.next({
      key: 'averageTime',
      value: (this.time - patient.arrivalTime)
    });
    this.newRecord(`Patient ${patient.id} went home. Treated.`);
    this.newPatientMessage.next(`We treated a patient for ${patient.condition}`);
  }

  newRecord(record) {
    this.records.push(record);
    this.recordChange.next(this.records);
  }

  newEvent() {
    if (Math.random() < this.chanceOfEvent) {
      let event = this.events[this.numberBetween(0, this.events.length - 1)];
      this.newPatientMessage.next(event.text);
    }
  }
}
