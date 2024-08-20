import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SiteSettings } from '../model/site-settings';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  url = "http://localhost:5048/api/Admin/";
  constructor(
    private http:HttpClient
  ) { }







  updateSiteSettings(model:SiteSettings){
   return this.http.put(this.url+ "Settings/", model)
  }

  getSiteSettings():Observable<SiteSettings>{

    return this.http.get<SiteSettings>(this.url+"Settings/")
  }
}
