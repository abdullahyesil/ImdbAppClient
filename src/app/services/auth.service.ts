import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private isAdminPage: boolean

  constructor() { }

  setAdminPage(isAdminPage2: boolean) {
    this.isAdminPage = isAdminPage2;

  }

  // isAdminPage değişkenini döndüren getter metod
  getAdminPage(): boolean {
    return this.isAdminPage
    debugger;
  }
}