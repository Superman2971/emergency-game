import { Subject } from 'rxjs/Subject';

export class StatsService {
  // stats
  stats = {
    money: {
      text: 'Money',
      value: 200
    },
    beds: {
      text: 'Beds',
      value: 1
    },
    averageTime: {
      text: 'Average Time',
      value: '0 minutes'
    },
    time: {
      text: 'Time',
      value: '0 minutes'
    }
  };
  statsChange: Subject<any> = new Subject<any>();
  dischargeTimes = [];
  // messages
  newStatMessage: Subject<string> = new Subject<string>();

  constructor() {}

  changeMoney(amount) {
    this.stats.money.value += amount;
    this.statsChange.next(this.stats);
  }

  newDischargeTime(time) {
    this.dischargeTimes.push(time);
    let sum = 0;
    let length = this.dischargeTimes.length;
    for (let i = 0; i < length; i++) {
      sum += this.dischargeTimes[i];
    }
    return Math.floor((sum / length) * 6);
  }

  newMessage(message) {
    this.newStatMessage.next(message);
  }
}
