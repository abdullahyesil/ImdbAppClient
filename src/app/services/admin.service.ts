import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SiteSettings } from '../model/site-settings';
import { Observable, of } from 'rxjs';
import { homePageSettings } from '../model/entities/homePageSettings';
import { imdbStoryModel } from '../model/entities/imdbStory';

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

  getHomePageSettings():Observable<homePageSettings>{
return this.http.get<homePageSettings>(this.url+"HomeSettings")
  }

  updateHomePage(model:homePageSettings){
    return this.http.put(this.url+"HomeSettings", model)
  }


  addStory(model:imdbStoryModel){
    return this.http.post(this.url+"Story", model)
  }
  getStory():Observable<imdbStoryModel[]>{
return this.http.get<imdbStoryModel[]>(this.url+"Story")
  }

  getStoryIds(ids: number[]): Observable<imdbStoryModel[]> {
    return this.http.post<imdbStoryModel[]>(this.url+"StoryIds", ids);
  }
  
  
  
}
