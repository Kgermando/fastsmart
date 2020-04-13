import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'smartDate'
})
export class SmartDatePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
