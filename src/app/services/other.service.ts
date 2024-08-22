import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { voteInfoModel } from '../model/voteInfo.model';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(private http:HttpClient) { }

   vote:{
    movie_Id:number,
    user_Id:number,
    rate:number,
  }


   url="http://localhost:5048/api"

  Vote(movieId:number, vote:number, userId:number):any{

    let newVoteuRL= this.url + "/Rate/useVote";

    this.vote={
      movie_Id: movieId,
      user_Id: userId,
      rate: vote
    }
    
   return this.http.post(newVoteuRL, this.vote)
  }

  getVotedAdmin():Observable<voteInfoModel[]>{
    let newVoteuRL2= this.url + "/Rate";
   return this.http.get<voteInfoModel[]>(newVoteuRL2);
  }


  

}
