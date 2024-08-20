import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';
import { MovieService } from '../../services/movie.service';
import { MoviesModel } from '../../model/entities/movies.model';
import { DatePipe } from '@angular/common';
import { AlertifyServiceService } from '../../services/alertify-service.service';
import { ActorService } from '../../services/actor.service';
import { ActorDTO } from '../../model/entities/DTO/actorDTO';

@Component({
  selector: 'app-add-movies',
  templateUrl: './add-movies.component.html',
  styleUrls: ['./add-movies.component.scss'],
  providers: [CategoryService, MovieService, DatePipe]
})
export class AddMoviesComponent implements OnInit {

  categories: CategoryModel[] = [];
  actors: ActorDTO[]=[]
  model: any = {};

  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private datePipe: DatePipe,
    private alertify: AlertifyServiceService,
    private actorService:ActorService
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });

    this.actorService.get(0,6, "").subscribe(resp=> 
      this.actors= resp.actors
    )
  }

search(event:string){

  this.actorService.get(0,6,event).subscribe(resp=> this.actors = resp.actors)
console.log(event)
}
  formatDate(date: string): string {
    const parts = date.split('.');
    const parsedDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    return !isNaN(parsedDate.getTime()) ? this.datePipe.transform(parsedDate, 'yyyy-MM-dd') || '' : '';
  }


  addMovie(name: any, description: any, imageUrl: any, releaseDate: any, rate: any, categoryId: any, ): void {
    const movie: MoviesModel = {
      movieName: name.value,
      description: description.value,
      releaseDate: this.formatDate(releaseDate.value),
      imageUrl: imageUrl.value,
      rate: parseInt(rate.value),
      categoryId: parseInt(categoryId.value),
    };

    this.movieService.addMovie(movie).subscribe(
      data => {
        if (data && data.message) {
          this.alertify.succes(data.message);
        }
      },
      error => {
        console.error('Bir hata oluştu:', error);
        this.alertify.error('İşlem sırasında bir hata oluştu');
      }
    );
  }
}
