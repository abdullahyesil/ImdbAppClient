import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, delay, Observable, tap } from 'rxjs';
import { MoviesModel } from '../model/entities/movies.model';

@Injectable(

 {providedIn: 'root'}
)
export class MovieService {
  url="http://localhost:5048/api"
 constructor(private http: HttpClient) { }


 getMovies(categoryId: number): Observable<MoviesModel[]> {
  let newUrl =this.url +"/Movie";

  if (categoryId) {
      newUrl = this.url+"/category/" +categoryId ;
  }

  return this.http.get<MoviesModel[]>(newUrl).pipe(
    delay(500) //loading icon içon delay ekledik..
  );
}

getMoviesPage(page:number, size:number, searchKey:string)
{
  return this.http.get<any>(this.url+ "/Movie", {
    params: {
      page:page,
      size:size,
      value:searchKey
    }
  })
}


 getMovieById(movieId:number):Observable<MoviesModel>{
   console.log(this.url + '/Movie/' + movieId);
   return this.http.get<MoviesModel>(this.url + '/Movie/' + movieId);
 }

 addMovie(movie: MoviesModel): Observable<any>{
  let newUrl= this.url + '/Movie';
  return this.http.post<MoviesModel>(newUrl, movie);
}

updateMovie(movie:MoviesModel){
  let newUpdateUrl= this.url + '/movie/updateMovie/' +movie.id;

  return this.http.put<MoviesModel>(newUpdateUrl,movie)
}

voteMovie(movie:MoviesModel, verilenOy:number){
  let newVoteUrl= this.url + '/movie/updateMovie/'+movie.id;
}

getMovieIds(ids:number[]):Observable<MoviesModel[]>{
return this.http.post<MoviesModel[]>(this.url+ "/Movie/MovieIds/", ids)
}

}
