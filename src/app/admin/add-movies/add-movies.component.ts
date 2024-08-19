import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';
import { MovieService } from '../../services/movie.service';
import { MoviesModel } from '../../model/movies.model';
import { DatePipe } from '@angular/common';
import { AlertifyServiceService } from '../../services/alertify-service.service';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-add-movies',
  templateUrl: './add-movies.component.html',
  styleUrl: './add-movies.component.scss',
  providers: [CategoryService, MovieService, DatePipe]
})
export class AddMoviesComponent implements OnInit {

  categories: CategoryModel[];
  convertedDate: Date | null = null;
  model: any ={};

  


  // movieForm: FormGroup={
  //   movieName: new FormControl("Film Adı"),
  //   description: new FormControl("Açıklama"),
  // }

  constructor( private categoryService: CategoryService,
    private movieService: MovieService,
    private datePipe: DatePipe,
    private alertify: AlertifyServiceService

  ){}

  ngOnInit(): void {
   
    this.categoryService.getCategories().subscribe(data =>
      {
        this.categories=data;
      });
  }



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

 addMovie(name: any, description: any, imageUrl: any, releaseDate:any, rate:any, categoryId:any )
 {
    console.log(name.value);
    console.log(description.value);
    console.log(imageUrl.value);
    console.log(this.formatDate(releaseDate.value));
    console.log(rate.value);
    console.log(categoryId.value);
    

   var movie: MoviesModel={ 
    movieName: name.value,
    description: description.value,
    releaseDate: this.formatDate(releaseDate.value),
    imageUrl: imageUrl.value,
    rate: parseInt(rate.value),
    categoryId: parseInt(categoryId.value)
    };
  
    return this.movieService.addMovie(movie).subscribe(
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
