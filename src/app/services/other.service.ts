import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { voteInfoModel } from '../model/voteInfo.model';
import { Reaction } from '../model/entities/reaction';
import { StatisticModel } from '../model/entities/statistic';

@Injectable({
  providedIn: 'root'
})
export class OtherService {

  constructor(private http: HttpClient) { }

  vote: {
    movie_Id: number,
    user_Id: number,
    rate: number,
  }
  reactType: {
    reactionType: number;
  }


  url = "http://localhost:5048/api"

  Vote(movieId: number, vote: number, userId: number): any {

    let newVoteuRL = this.url + "/Rate/useVote";

    this.vote = {
      movie_Id: movieId,
      user_Id: userId,
      rate: vote
    }

    return this.http.post(newVoteuRL, this.vote)
  }

  getVotedAdmin(): Observable<voteInfoModel[]> {
    let newVoteuRL2 = this.url + "/Rate";
    return this.http.get<voteInfoModel[]>(newVoteuRL2);
  }

  getMovieLike(id: number): Observable<Reaction> {
    let newUrl = this.url + "/Reactions/" + id + "/likes";
    return this.http.get<Reaction>(newUrl)
  }

  addMovieLike(id: number, vote: number) {
    this.reactType = {
      reactionType: vote
    }
    let newUrl = this.url + "/Reactions/" + id + "/react";
    return this.http.post(newUrl, this.reactType)
  }

  getLikeByMovieId(movieId:number):Observable<boolean>{
    return this.http.get<boolean>(this.url+"/Reactions/", {params:{
      movieId:movieId
    }})
  }

getStatistic(page:number,size:number):Observable<StatisticModel>{

return this.http.get<StatisticModel>(this.url+"/Statistic", {
  params:{
    page:page,
    size:size
  }
})
}



}
