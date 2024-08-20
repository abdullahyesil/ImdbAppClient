import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ActorDTO } from '../model/entities/DTO/actorDTO';

@Injectable({
  providedIn: 'root'
})
export class ActorService {

  url = "http://localhost:5048/api/Actor/";
  constructor(
    private http:HttpClient
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
}
