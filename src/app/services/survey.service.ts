import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SurveysModel } from '../model/entities/surveys/surveys';
import { Observable } from 'rxjs';
import { resultsSurvey } from '../model/entities/surveys/resultSurvey';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  constructor(
    private http:HttpClient
){}

url = "http://localhost:5048/api/Admin/Survey/";


getAll():Observable<SurveysModel[]>{
  
 return this.http.get<SurveysModel[]>(this.url)
}
getbyId(id:number):Observable<SurveysModel>{

  return this.http.get<SurveysModel>(this.url+id)
}

vote(optionId:number):Observable<any>
{
  return this.http.post(this.url+"vote", optionId)
}

createSurvey(surveysModel:SurveysModel):Observable<any>{
return this.http.post(this.url, surveysModel)
}

resultsSurvey(id:number):Observable<resultsSurvey[]>{
  return this.http.get<resultsSurvey[]>(this.url+ id+ "/results")
}



}
