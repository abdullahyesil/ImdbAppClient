import { Component, OnInit, inject } from '@angular/core';
import { MovieService } from '../../services/movie.service';
import { MoviesModel } from '../../model/entities/movies.model';
import { MatDialog } from '@angular/material/dialog';
import { AlertifyServiceService } from '../../services/alertify-service.service';
import { UpdateMoviesComponent } from '../update-movies/update-movies.component';
import { UserauthService } from '../../services/userauth.service';

@Component({
  selector: 'app-get-movies',
  templateUrl: './get-movies.component.html',
  styleUrl: './get-movies.component.scss'
})
export class GetMoviesComponent implements OnInit{
  filterText:string = "";
  movies: MoviesModel[] = [];
  filtredMovies: MoviesModel[];
  readonly dialog = inject(MatDialog);
  isUserActive: boolean= false;
constructor(
 private movieService: MovieService,
 private alertify:AlertifyServiceService,
private authService:UserauthService
){}

  ngOnInit(): void {
      this.movieService.getMovies(null).subscribe(data => {

        this.movies = data;
        this.filtredMovies = this.movies;
      });
        
       console.log(this.authService.user.value.token2)
  }


  onInputChance(){
    console.log(this.filterText);
    this.filtredMovies = this.filterText ?
      this.movies.filter(m => 
        m.movieName.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1 || 
        m.description.toLowerCase().indexOf(this.filterText.toLowerCase()) !== -1
      ) :
      this.movies;
  }

  openUpdateMovieModal(id:number){
      const diagloRef= this.dialog.open(UpdateMoviesComponent, {data:{id}});

  }

  aktifMi(user:any){
    if(user){

      this.isUserActive=true
    }

  }
}
