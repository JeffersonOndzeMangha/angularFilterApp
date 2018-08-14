import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cleanUrl'
})
export class CleanUrlPipe implements PipeTransform {

  //transforms normal string into url clean value changing spaces with > 'can be what ever'
  transform(value: any, args?: any): any {
    if(value){
      return value.replace(/\s+/g, '>');
    }
  }

}
