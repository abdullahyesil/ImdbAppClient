import { Injectable } from '@angular/core';

declare let alertify:any;
@Injectable()


export class AlertifyServiceService {

  constructor() { }

  succes(message:string){
    alertify.success(message);
  }

  error(message:string)
  {
    alertify.error(message);
  }

  warning(message:string){
    alertify.warning(message);
  }
  
}
