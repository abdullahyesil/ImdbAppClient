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

getMoviesPage(page:number, size:number, searchKey:string, categoryId?:number)
{
  if(categoryId!=null){

    return this.http.get<any>(this.url+ "/Movie", {
      params: {
        page:page,
        size:size,
        value:searchKey,
        categoryId:categoryId
      }
    })
  }



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

 addMovie(movie: MoviesModel): Observable<any> {
  const newUrl = `${this.url}/Movie`;

  // FormData oluşturun ve movie model verilerini ekleyin
  const formData = new FormData();
  formData.append('movieName', movie.movieName);
  formData.append('description', movie.description);
  formData.append('releaseDate', movie.releaseDate.toString());  // Date'i ISO formatında ekleyin
  formData.append('imageUrl', movie.imageUrl);
  formData.append('rate', movie.rate.toString());
  formData.append('categoryId', movie.categoryId.toString());
  formData.append('trailer', movie.trailer)


  // Aktör ID'leri ve adlarını ekleyin
  movie.actors.forEach((actor, index) => {
    formData.append(`actors[${index}].id`, actor.id.toString());
    formData.append(`actors[${index}].name`, actor.name);
  });

  // Dosya verisini FormData'ya ekleyin (eğer varsa)
  if (movie.ImageFile) {
    formData.append('ImageFile', movie.ImageFile);
  }

    formData.append('CarouselImageFile', movie.CarouselImageFile)
  


  // HTTP POST isteğini gönderin
  return this.http.post(newUrl, formData);
}



updateMovie(movie:MoviesModel){

    // FormData oluşturun ve movie model verilerini ekleyin
    const formData = new FormData();
    formData.append('movieName', movie.movieName);
    formData.append('description', movie.description);
    formData.append('releaseDate', movie.releaseDate.toString());  // Date'i ISO formatında ekleyin
    formData.append('imageUrl', movie.imageUrl);
    formData.append('rate', movie.rate.toString());
    formData.append('categoryId', movie.categoryId.toString());
    formData.append('trailer', movie.trailer)
    formData.append('id', movie.id.toString())
  

  // Aktör ID'leri ve adlarını ekleyin
  movie.actors.forEach((actor, index) => {
    formData.append(`actors[${index}].id`, actor.id.toString());
    formData.append(`actors[${index}].name`, actor.name);
  });
 // Dosya verisini FormData'ya ekleyin (eğer varsa)
 if (movie.ImageFile) {
  formData.append('ImageFile', movie.ImageFile);
}

    

  let newUpdateUrl= this.url + '/movie/updateMovie/' +movie.id;

  return this.http.put<MoviesModel>(newUpdateUrl,formData)
}

voteMovie(movie:MoviesModel, verilenOy:number){
  let newVoteUrl= this.url + '/movie/updateMovie/'+movie.id;
}

getMovieIds(ids:number[]):Observable<MoviesModel[]>{
return this.http.post<MoviesModel[]>(this.url+ "/Movie/MovieIds/", ids)
}

deleteMovie(id:number){
return this.http.delete(this.url+"/Movie/delete/" + id)
}

}
