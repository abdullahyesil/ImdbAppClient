import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MoviesModel } from '../model/entities/movies.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  providers: [MovieService]
})
export class MovieDetailsComponent implements OnInit {

  movie: MoviesModel;

 constructor(
    private movieService: MovieService,
    private activaedroot: ActivatedRoute
  ){  }
  ngOnInit(): void {
  

    this.activaedroot.params.subscribe(params=> {

      this.movieService.getMovieById(params["id"]).subscribe
      (data => {
        this.movie = data;
      });
    })
}


}
