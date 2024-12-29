import { Component, inject, OnInit } from '@angular/core';
import { MovieService } from '../services/movie.service';
import { MoviesModel } from '../model/entities/movies.model';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { LocalStorageService } from '../services/local-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../user/auth/auth.component';
import { OtherService } from '../services/other.service';
import { Reaction } from '../model/entities/reaction';
import { CommentService } from '../services/comment.service';
import { Comments } from '../model/entities/DTO/comments';
import { AlertifyServiceService } from '../services/alertify-service.service';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.component.html',
  styleUrl: './movie-details.component.scss',
  providers: [MovieService]
})
export class MovieDetailsComponent implements OnInit {

  movie: MoviesModel;
  reaction: Reaction = null
  safeUrl: SafeResourceUrl;
  likesYuzdesi: number = 0;
  readonly dialog = inject(MatDialog);
  totalCount: number = 0;
  page:number= 0;
  size:number=1;
  yorumlar: Comments[] = []
  commentHata: string = "";

  constructor(
    private movieService: MovieService,
    private activaedroot: ActivatedRoute,
    private dom: DomSanitizer,
    private localStorage: LocalStorageService,
    private otherService: OtherService,
    private commentService: CommentService,
    private alertifyService:AlertifyServiceService,

  ) { }

  ngOnInit(): void {
    

    this.activaedroot.queryParamMap.subscribe(params => {
      const movieId: number = Number(params.get('id'));
      
      this.movieService.getMovieById(movieId).subscribe
      (data => {
        this.movie = data;
        this.safeUrl = this.dom.bypassSecurityTrustResourceUrl(this.movie.trailer);
      });
    this.getLike(movieId)
    this.getComments(movieId,this.page,this.size)

      if(this.localStorage.getItem("User")){

        this.otherService.getLikeByMovieId(movieId).subscribe(resp=> {
          if(resp==true){
            this.likeActive= true
          }
          else if(resp==false) {
            this.dislikeActive = true
          }
          })

      }
    });
    

    // this.activaedroot.params.subscribe(params => {

    //   this.movieService.getMovieById(params["id"]).subscribe
    //     (data => {
    //       this.movie = data;
    //       this.safeUrl = this.dom.bypassSecurityTrustResourceUrl(this.movie.trailer);
    //     });
    //   this.getLike(params["id"])
    //   this.getComments(params["id"],this.page,this.size)

    //     if(this.localStorage.getItem("User")){

    //       this.otherService.getLikeByMovieId(params["id"]).subscribe(resp=> {
    //         if(resp==true){
    //           this.likeActive= true
    //         }
    //         else if(resp==false) {
    //           this.dislikeActive = true
    //         }
    //         })

    //     }
    // })
  

  
  }
  getLike(id: number) {

    this.otherService.getMovieLike(id).subscribe(resp => {
      this.reaction = resp;

      if (this.reaction.totalCount > 0) {

        this.likesYuzdesi = (this.reaction.likes / this.reaction.totalCount) * 100;

      } else {

        this.likesYuzdesi = 50;
      }
    });
  }
  getComments(id: number, page: number, size: number) {
    this.commentService.getMovieComments(id, page, size).subscribe(resp => {
      this.yorumlar = resp.comments
      this.totalCount = resp.totalCount
    }
    )
  }

  likeActive: boolean = false;
  dislikeActive: boolean = false;

  isLogin(): boolean {
    return !!this.localStorage.getItem("User")
  }

  likeVideo(): void {
    if (this.isLogin()) {
      this.likeActive = !this.likeActive;
      if (this.likeActive) {
        this.otherService.addMovieLike(this.movie.id, 0).subscribe(resp => {
          this.getLike(this.movie.id)
        }

        )
        this.dislikeActive = false; // Dislike aktifse, pasif hale getir
      }
    }
    else {
      this.openLogin()
    }
  }

  openLogin() {
    const dialogRef = this.dialog.open(AuthComponent);
  }

  dislikeVideo(): void {
    if (this.isLogin()) {
      this.dislikeActive = !this.dislikeActive
      if (this.dislikeActive) {
        this.otherService.addMovieLike(this.movie.id, 1).subscribe(rep => {
          this.getLike(this.movie.id);
        })
        this.likeActive = false; // Like aktifse, pasif hale getir
      }
    }
    else {
      this.openLogin()
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



 
  addComment(_t59: HTMLTextAreaElement, arg1: number) {
    console.log(_t59.value)
    if (_t59.value != null && _t59.value.length >= 15 && _t59.value.length <= 250) {
      this.commentHata = ""
      this.commentService.addComments(arg1, _t59.value).subscribe(resp => {
       {
          _t59.value = "";
          this.alertifyService.succes("Başarıyla yorum yapıldı. Onaylandıktan sonra yayınlanacaktır.")

       }
   
      }
      )}
    else {
      this.commentHata = "Lütfen yorum satırını doldurun ve 15 ile 250 karakter arasında girin."

    }
  }


  loadMore() {
   this.size = this.size + this.size
   this.getComments(this.movie.id, this.page, this.size)
    }

}
