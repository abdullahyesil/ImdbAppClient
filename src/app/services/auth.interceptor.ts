import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { catchError, exhaustMap, switchMap, take } from "rxjs/operators";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { LoginService } from "./loginservice";
import { LocalStorageService } from "./local-storage.service";
import { UserModel } from "../model/user.model";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {


    constructor(
        private localService: LocalStorageService,
        private router: Router,
        private snackBar: MatSnackBar
    ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const token = this.localService.getItem("User");

        if (token && token.token) {
            req = this.addToken(req, token.token);
        }
     
        return next.handle(req).pipe(
            catchError((error: HttpErrorResponse) => {
                if (error.status === 401) {
                    this.snackBar.open('Yetkilendirme hatası: Lütfen giriş yapın.', '', {
                        duration: 3000,
                    });
                    this.router.navigate(["/login"]);
                }
                return throwError(() => new Error(error.message || 'Sunucu hatası!'));
            })
        );
    }

    private addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
    }
}
