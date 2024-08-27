import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { ActorDTO } from '../model/entities/DTO/actorDTO';
import { AlertifyServiceService } from './alertify-service.service';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  url = "http://localhost:5048/api/Actor/";
  constructor(
    private http:HttpClient,
    private alertify: AlertifyServiceService
  ) { }

  get(page:number, size:number, value:string):Observable<any>{

    return this.http.get<any>(this.url+ "getActors", {
      params: {
        page:page,
        size:size,
        value:value
      }
    })
  }

  add(model: ActorDTO, options = {}): Observable<any> {
    const formData: FormData = new FormData();
    formData.append('name', model.name);
    if(model.File){
        formData.append('File', model.File);
    }
    console.log('FormData içeriği:', formData.get('name'), formData.get('File'));
    return this.http.post(this.url + "addActor", formData, { ...options, observe: 'response' }).pipe(
        catchError(this.handleError.bind(this))
    );
}


  update(model:ActorDTO): Observable<any>{
    return this.http.put(this.url+ "updateActor/", model).pipe(
      catchError(this.handleError.bind(this))
    );
  }
  delete(id:number): Observable<any>{
    return this.http.delete(this.url+ "delete/"+ id).pipe(
      catchError(this.handleError.bind(this))
    );
  }




private handleError(error: HttpErrorResponse): Observable<never> {
  let errorMessage = 'Unknown error!';
  
  if (error.status === 409) {
    errorMessage = error.error.message;  // Sunucudan gelen hata mesajını al
  } else {
    errorMessage = `Error: ${error.message}`;
  }
  
  // Hata mesajını kullanıcıya göster
  this.alertify.error(errorMessage);

  // Hata observable'ını döndür
  return throwError(() => new Error(errorMessage));
}


}