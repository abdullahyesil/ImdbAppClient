import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { BehaviorSubject, Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { UserModel } from '../model/user.model';
import { AuthResponse } from '../model/authResponse';
import { LocalStorageService } from './local-storage.service';


@Injectable({
  providedIn: 'root'
})
export class UserauthService {
apiUrl="http://localhost:5048/api/User"
  constructor(private http:HttpClient,
    private localService:LocalStorageService
  ) { }

  user = new BehaviorSubject<UserModel>(null); //Önceki değeride okuyor. BehaviorSubject
  login(email: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(this.apiUrl + "/login", {
      email: email,
      password: password
    }).pipe(
      tap(response => {
        const ExpirationDate = new Date(new Date().getTime() + (response.tokenExpires * 1000));
        const user = new UserModel(
          response.id,
          response.message,
          response.token,
          ExpirationDate
        );
        
        this.user.next(user);
        this.localService.setItem("User", user)
        console.log('Login response:', response); // Login yanıtını logla
        console.log('User token:', response.token); // Token'ı logla
      })
    );
  }
  

  signUp(email:string, password:string)
{
      return this.http.post<AuthResponse>(this.apiUrl+"/signUp", email + password).pipe(tap(response =>
        {   
          const ExpirationDate= new Date(new Date().getTime() + (response.tokenExpires * 1000))  

          const user = new UserModel(
            response.id.toString(),
            response.token,
            response.tokenExpires.toString(),
          ExpirationDate);
          this.user.next(user)
        }
      ))


      

}


  private handleError(response: HttpErrorResponse){

    if(response.error.error.message){

      console.log(response.error.error.message)
      debugger;

      return response.error.error.message
    }

   
   
  }
}
