import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comments } from '../model/entities/DTO/comments';
import { CommentsDTO } from '../model/entities/DTO/commentDTO';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  constructor(
    private http:HttpClient
){}

url = "http://localhost:5048/api/Comments/";

getMovieComments(MovieId:number, page:number, size:number):Observable<CommentsDTO>{
return this.http.get<CommentsDTO>(this.url+ MovieId + "/approvedComments",{
  params:{
    page:page,
    size:size
  }
})
}
addComments(MovieId: number, content: string) {
  const body = JSON.stringify(content); // JSON.stringify ile stringi tırnak içine alıyoruz
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  return this.http.post(this.url + MovieId + "/addComment", body, { headers: headers });
}


getAllComments(page:number,size:number, onay?:boolean):Observable<CommentsDTO>{  
if(onay == true || onay == false )
  {
    return this.http.get<CommentsDTO>(this.url, {
      params:{
        page:page,
        size:size,
        onay:onay
      }
    })
  }
  else {

    return this.http.get<CommentsDTO>(this.url, {
      params:{
        page:page,
        size:size
      }
    })
  }

}

approve(commentId:number):Observable<any>{
return this.http.post(this.url+ "approve/"+commentId, {
  params: {
    commentId:commentId
  }
})
}


}
