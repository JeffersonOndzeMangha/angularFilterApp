import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanUrl'
})
export class CleanUrlPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    if(value){
      return value.replace(/\s+/g, '>');
    }
  }

}
