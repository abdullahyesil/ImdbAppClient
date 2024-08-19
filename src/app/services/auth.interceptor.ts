import { HttpEvent, HttpHandler, HttpInterceptor, HttpParams, HttpRequest } from "@angular/common/http";
import { Observable, exhaustMap, retry, take } from "rxjs";
import { UserauthService } from "./userauth.service";
import { Injectable } from "@angular/core";
import { LocalStorageService } from "./local-storage.service";
import { UserModel } from "../model/user.model";


@Injectable()
export class AuthInterceptor implements HttpInterceptor{
   
    constructor(private authService:UserauthService,
    private localStorageService:LocalStorageService
    ){}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

      // Local storage'dan kullanıcı bilgilerini al
    const currentUser = this.localStorageService.getItem("User")
        console.log("Şimdi ki kullanıcı: " + currentUser)
       // Kullanıcı var ve token mevcutsa isteğe ekle
       
    if (currentUser && currentUser.token) {
        req = req.clone({
          setHeaders: {
            Authorization: `Bearer ${currentUser.token}`
          }
        });
      }
  
      // İsteği bir sonraki handler'a ilet
      return next.handle(req);

    }

}