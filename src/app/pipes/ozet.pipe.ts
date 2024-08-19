import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ozet'
})
export class OzetPipe implements PipeTransform {

  transform(value: string, limit?:number) {
    
    if(!value) return null;
    limit = limit? limit:30; //liöit tanımlanmış ise onu al

    if(limit> value.length) return value;

    return value.substring(0, limit)+ '...';
  }

 

}
