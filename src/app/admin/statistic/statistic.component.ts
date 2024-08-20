import { Component, OnInit } from '@angular/core';
import { OtherService } from '../../services/other.service';
import { voteInfoModel } from '../../model/voteInfo.model';
import { MoviesModel } from '../../model/entities/movies.model';
import { MovieService } from '../../services/movie.service';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent implements OnInit {

  voteStatistic:voteInfoModel[] = null;
  movies: MoviesModel[] = null;
  moviesMap: { [key: number]: any } = {}; 
  
  constructor(
    private voteService: OtherService,
    private movieService: MovieService
  ){
  }

  ngOnInit(): void {
    this.voteService.getVotedAdmin().subscribe(data => {
      this.voteStatistic = data;});

      this.movieService.getMovies(null).subscribe(data => {
     this.movies=data;
     this.createMoviesMap();
      });

      
  }
  
  // Filmleri movie_id ile eşleştirmek için bir map oluşturuyoruz
createMoviesMap(): void {
  this.moviesMap = {};
  this.movies.forEach(movie => {
    this.moviesMap[movie.id] = movie;
  });
}

// Filmin adını movie_id'ye göre almak için bir yardımcı yöntem
getFilmName(movieId: number): string {
  const movie = this.moviesMap[movieId];
  return movie ? movie.movieName : 'Bilinmeyen Film';
}
  

}
