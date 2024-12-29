import { Injectable } from '@angular/core';
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class DecodeService {

  constructor() { }


  DecodeToken(token: string): any {
    const decodeHeader = jwtDecode(token)
    return decodeHeader
    }
}
