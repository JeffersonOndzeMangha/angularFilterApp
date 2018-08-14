import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toDate'
})
export class ToDatePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let arr = value.split('-');
    return new Date(arr[1], arr[2], arr[0]);
  }

}
