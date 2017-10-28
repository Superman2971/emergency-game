import { Subject } from 'rxjs/Subject';

export class StatsService {
  // money
  moneyChange: Subject<number> = new Subject<number>();
  money = 200;
  // messages
  newStatMessage: Subject<string> = new Subject<string>();

  constructor() {}

  changeMoney(amount) {
    this.money += amount;
    this.moneyChange.next(this.money);
  }

  newMessage(message) {
    this.newStatMessage.next(message);
  }
}
