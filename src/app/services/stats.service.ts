import { Subject } from 'rxjs/Subject';

export class StatsService {
  // stats
  stats = {
    money: 200,
    beds: 1,
    otherInfo: 'need lots more'
  };
  statsChange: Subject<any> = new Subject<any>();
  // messages
  newStatMessage: Subject<string> = new Subject<string>();

  constructor() {}

  changeMoney(amount) {
    this.stats.money += amount;
    this.statsChange.next(this.stats);
  }

  newMessage(message) {
    this.newStatMessage.next(message);
  }
}
