import { Component, Inject, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { Dialog } from '@angular/cdk/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MoviesModel } from '../../model/entities/movies.model';
import { CategoryModel } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { ActorDTO } from '../../model/entities/DTO/actorDTO';
import { PageEvent } from '@angular/material/paginator';
import { ActorService } from '../../services/actor.service';

@Component({
  selector: 'app-update-movies',
  templateUrl: './update-movies.component.html',
  styleUrl: './update-movies.component.scss',
  providers: [DatePipe]
})
export class UpdateMoviesComponent implements OnInit {


 movie:MoviesModel;
 MovieId:number;
 categories: CategoryModel[];
 selectedCategoryId:number;
 totalCount:number;
 size:number=10;
 pageIndex:number=0;
 actorModel:ActorDTO[]= [];
 searchKey:string = "";
 myMovieActors: ActorDTO[] = []


 constructor(
  private movieService: MovieService,
  private categoryService: CategoryService,
  @Inject (MAT_DIALOG_DATA) public data:MoviesModel,
  private actorService:ActorService,
  private datePipe: DatePipe,
){

}

  ngOnInit(): void {

    this.MovieId = this.data.id
    //film bilgileri
    this.movieService.getMovieById(this.data.id).subscribe(veri => {
      this.movie=veri;  
      this.selectedCategoryId = this.movie.categoryId
      this.myMovieActors = this.movie.actors
  
    });

//  oyuncu getir
this.actorGetir( this.pageIndex, this.size,this.searchKey )

      //kategori listesi
      this.categoryService.getCategories().subscribe(data=>
      {
        this.categories=data;});}

        
        formatDate(date: string): string {
          // Örneğin, gelen string formatı dd.MM.yyyy ise
          const parts = date.split('.'); // String'i nokta karakterine göre bölelim
      
          // parts dizisinden tarih bileşenlerini alarak Date nesnesi oluşturalım
          const parsedDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
      
          if (!isNaN(parsedDate.getTime())) { // Geçerli bir tarih mi kontrol edelim
            return this.datePipe.transform(parsedDate, 'yyyy-MM-dd') || '';
          } else {
            return ''; // Geçersiz bir tarih ise boş döndürelim veya hata işleyelim
          }
        }
      
      updateMovie(id:any, movieName:any, description:any, imageUrl:any, releaseDate:any, rate:any, categoryId:any, trailer:any){
      

        console.log(releaseDate.value);
        console.log(trailer.value);
      
        
        
        var movie: MoviesModel={ 
          id: id.value,
          movieName: movieName.value,
          description: description.value,
          releaseDate: this.formatDate(releaseDate.value),
          imageUrl: imageUrl.value,
          rate: parseInt(rate.value),
          trailer: trailer.value,
          categoryId: parseInt(categoryId.value),
          actors:this.myMovieActors
          };
          console.log(movie)
          return this.movieService.updateMovie(movie).subscribe(data => console.log(data));
      
      }
 

      onPageChange(event: PageEvent) {
        this.pageIndex = event.pageIndex;
        this.size = event.pageSize;
        
        // Burada API'yi tekrar çağırarak, belirli sayfa boyutuna göre verileri çekebilirsiniz
        this.actorGetir(this.pageIndex, this.size, this.searchKey);
       
      }

      search(event:string){
        this.searchKey = event
        this.actorGetir( this.pageIndex, this.size, this.searchKey)
      
      }
          

      actorGetir(page:number, size:number, value?:string){

        this.actorService.get(page,this.size,value).subscribe(resp=> {
          this.actorModel = resp.actors
          this.totalCount = resp.totalCount
        })
      
      }


      AddMyMovieActor(item:ActorDTO) {
    
        if(!this.myMovieActors.includes(item))
          this.myMovieActors.push(item)
        }
    
        deleteMyMovieActor(_t66: ActorDTO) {
          this.myMovieActors = this.myMovieActors.filter(m => m.name !== _t66.name);
          }
          
      
}
