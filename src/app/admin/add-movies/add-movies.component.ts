import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../../model/category.model';
import { CategoryService } from '../../services/category.service';
import { MovieService } from '../../services/movie.service';
import { MoviesModel } from '../../model/entities/movies.model';
import { DatePipe } from '@angular/common';
import { AlertifyServiceService } from '../../services/alertify-service.service';
import { ActorService } from '../../services/actor.service';
import { ActorDTO } from '../../model/entities/DTO/actorDTO';
import { PageEvent } from '@angular/material/paginator';
import { UploadEvent } from 'primeng/fileupload';

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
  totalCount:number;
  pageIndex:number=0;
  size:number=12;
  searchKey:string = ""
  myMovieActors: ActorDTO[] = []

  constructor(
    private categoryService: CategoryService,
    private movieService: MovieService,
    private datePipe: DatePipe,
    private alertify: AlertifyServiceService,
    private actorService:ActorService,
    
  ) { }

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe(data => {
      this.categories = data;
    });

    this.actorGetir( this.pageIndex, this.size,this.searchKey )
  }

  AddMyMovieActor(item:ActorDTO) {
    
    if(!this.myMovieActors.includes(item))
      this.myMovieActors.push(item)
    }

    deleteMyMovieActor(_t66: ActorDTO) {
      this.myMovieActors = this.myMovieActors.filter(m => m.name !== _t66.name);
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
    this.actors = resp.actors
    this.totalCount = resp.totalCount
  })

}



  formatDate(date: string): string {
    const parts = date.split('.');
    const parsedDate = new Date(parseInt(parts[2]), parseInt(parts[1]) - 1, parseInt(parts[0]));
    return !isNaN(parsedDate.getTime()) ? this.datePipe.transform(parsedDate, 'yyyy-MM-dd') || '' : '';
  }


  addMovie(name: any, description: any, imageUrl: any, releaseDate: any, rate: any, categoryId: any): void {
    const movie: MoviesModel = {
      movieName: name.value,
      description: description.value,
      releaseDate: this.formatDate(releaseDate.value),
      imageUrl: imageUrl.value,
      rate: parseInt(rate.value),
      categoryId: parseInt(categoryId.value),
      ImageFile:this.selectedFile,
      actors: this.myMovieActors
    };
    console.log(movie)

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


  selectedFile: File | null = null;

  onSelect(event: any): void {
    const files: File[] = event.files;
  
    if (files && files.length > 0) {
      const file: File = files[0];
  
      // Dosyanın türünü kontrol et
      const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'];
  
      if (allowedTypes.includes(file.type)) {
        this.selectedFile = file; // Dosya türü uygunsa dosyayı sakla
        console.log('Dosya türü uygun:', file.type);
      } else {
        console.error('Hatalı dosya türü:', file.type);
        alert('Yalnızca PNG, JPEG, JPG, GIF türlerinde dosyalar yüklenebilir.');
      }
    }
  }
  

  
  
}
