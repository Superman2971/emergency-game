import {PipeTransform, Pipe} from '@angular/core';

@Pipe({
  name: 'object'
})
export class ObjectPipe implements PipeTransform {

  transform(obj: any): any[] {
    return Object.keys(obj).map(k => {
      return {key: k, value: obj[k]};
    });
  }
}
