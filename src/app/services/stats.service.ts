import { Subject } from 'rxjs/Subject';

export class StatsService {
  // money
  moneyChange: Subject<number> = new Subject<number>();
  money = 200;
  // messages
  messagesChange: Subject<string> = new Subject<string>();

  constructor() {}

  changeMoney(amount) {
    this.money += amount;
    this.moneyChange.next(this.money);
  }

  newMessage(message) {
    this.messagesChange.next(message);
  }
}
