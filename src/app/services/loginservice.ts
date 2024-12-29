import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { UserModel } from '../model/user.model';
import { AuthResponse } from '../model/authResponse';
import { LocalStorageService } from './local-storage.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  apiUrl = "http://localhost:5048/api/User";
  private userSubject = new BehaviorSubject<UserModel | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(
    private http: HttpClient,
    private localService: LocalStorageService
  ) { 
    const savedUser = this.localService.getItem("User");
    if (savedUser) {
      this.userSubject.next(savedUser);
    }
  }

  login(email: string, password: string): Observable<any> {
    debugger;
    return this.http.post<AuthResponse>(this.apiUrl + "/login", {
      email: email,
      password: password
    }).pipe(
      tap(response => {

        if(response.token){ //token varsa bu işlemleri yap
        const expirationDate = new Date(new Date().getTime() + (response.tokenExpires * 1000));
        const user = new UserModel(
          response.id,
          response.message,
          response.token,
          expirationDate
        );
        this.localService.setItem("User", user);
        this.userSubject.next(user); 
      }
      else {
        
      }
      })
    );
  }

  signUp(email: string, password: string): Observable<any> {
    return this.http.post<AuthResponse>(this.apiUrl + "/signUp", {
      email: email,
      password: password
    }).pipe(
      tap(response => {
        const expirationDate = new Date(new Date().getTime() + (response.tokenExpires * 1000));
        const user = new UserModel(
          response.id,
          response.message,
          response.token,
          expirationDate
        );
        this.localService.setItem("User", user);
        this.userSubject.next(user); // Kullanıcı durumunu güncelle
      }),
      catchError(this.handleError)
    );
  }

  logout(): void {
    this.localService.removeItem("User");
    this.userSubject.next(null); // Kullanıcı durumunu sıfırla
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred!';
    if (error.error?.message) {
      errorMessage = error.error.message;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }

  getCurrentUser(): UserModel | null {
    return this.userSubject.value;
  }
}
