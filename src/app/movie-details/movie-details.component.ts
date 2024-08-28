import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MoviesModel } from '../model/entities/movies.model';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  providers: [MovieService]
})
export class MovieDetailsComponent implements OnInit {


  movie: MoviesModel;
  safeUrl: SafeResourceUrl;
 constructor(
    private movieService: MovieService,
    private activaedroot: ActivatedRoute,
    private dom:DomSanitizer
    
  ){  }
  
  ngOnInit(): void {
  

    this.activaedroot.params.subscribe(params=> {

      this.movieService.getMovieById(params["id"]).subscribe
      (data => {
        this.movie = data;
        this.safeUrl = this.dom.bypassSecurityTrustResourceUrl(this.movie.trailer);
      });
    })
}

likeActive: boolean = false;
dislikeActive: boolean = false;

likeVideo(): void {
    this.likeActive = !this.likeActive;
    if (this.likeActive) {
        this.dislikeActive = false; // Dislike aktifse, pasif hale getir
    }
}

dislikeVideo(): void {
    this.dislikeActive = !this.dislikeActive;
    if (this.dislikeActive) {
        this.likeActive = false; // Like aktifse, pasif hale getir
    }
}


scrollToYorumYap() {
  const element = document.getElementById('yorumYap');
  if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
  }
}


getStars(rate: number): string[] {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
      if (i <= rate) {
          stars.push('★'); // Dolgun yıldız simgesi
      } else {
          stars.push('☆'); // Boş yıldız simgesi
      }
  }
  return stars;
}



yorumlar = [
  {
    kullaniciAdi: 'Ali Veli',
    tarih: new Date('2024-08-26T10:15:00'),
    metin: 'Bu film gerçekten harikaydı! İzlerken çok keyif aldım.'
  },
  {
    kullaniciAdi: 'Ayşe Yılmaz',
    tarih: new Date('2024-08-25T14:45:00'),
    metin: 'Bazı sahneleri çok beğendim ama genel olarak biraz yavaş ilerliyordu.'
  },
  {
    kullaniciAdi: 'Mehmet Çetin',
    tarih: new Date('2024-08-24T18:30:00'),
    metin: 'Oyunculuk performansları mükemmeldi! Kesinlikle tavsiye ederim.'
  }
];



}
