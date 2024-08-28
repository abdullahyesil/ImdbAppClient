import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MoviesModel } from '../../model/entities/movies.model';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyServiceService } from '../../services/alertify-service.service';
import { UpdateMoviesComponent } from '../update-movies/update-movies.component';
import { UserauthService } from '../../services/userauth.service';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-get-movies',
  templateUrl: './get-movies.component.html',
  styleUrl: './get-movies.component.scss'
})
export class GetMoviesComponent implements OnInit{
  filterText:string = "";
  movies: MoviesModel[] = [];
  readonly dialog = inject(MatDialog);
  totalCount:number= 0;
  first: number = 0;
  rows: number = 10;
pageIndex:number = 0;
constructor(
 private movieService: MovieService,
 private alertify:AlertifyServiceService,

){}

  ngOnInit(): void {
    this.loadMovies(this.pageIndex, this.rows, "")
        
     
  }

  loadMovies(page:number, size:number, searchKey:string) {

    this.movieService.getMoviesPage(page, size, searchKey).subscribe(resp=>
      {this.movies = resp.movies
      this.totalCount = resp.totalCount
     }
    )
  }



  onInputChange(event: any): void {
    const inputValue = event.target.value;
    // Burada girdiği metne göre işlem yapabilirsiniz
    // Örneğin, bir arama işlemi başlatabilirsiniz
    this.filterText = inputValue;

    // Örneğin bir arama fonksiyonunu çağırabilirsiniz
    this.loadMovies(this.pageIndex, this.rows, this.filterText)
  }

  openUpdateMovieModal(id:number){
      const diagloRef= this.dialog.open(UpdateMoviesComponent, {data:{id}});

  }



  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.pageIndex = event.first / event.rows;
    this.loadMovies(this.pageIndex, this.rows, this.filterText)
  }

}
