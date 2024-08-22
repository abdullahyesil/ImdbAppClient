import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { SocialMediaDto } from '../model/entities/DTO/socialMediaDTO';
import { LocalStorageService } from '../services/local-storage.service';
import { homePageSettings } from '../model/entities/homePageSettings';
import { imdbStoryModel } from '../model/entities/imdbStory';
import { MovieService } from '../services/movie.service';
import { MoviesModel } from '../model/entities/movies.model';
import { SurveyService } from '../services/survey.service';
import { SurveysModel } from '../model/entities/surveys/surveys';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  
  homePageSettings:homePageSettings = null
  SocialDto:SocialMediaDto
  movieModel:MoviesModel[] = []
  surveyModel:SurveysModel

  StoryModel:imdbStoryModel[] = []
selectedOptionId: any;
  constructor(
    private AdminService:AdminService,
    private localService:LocalStorageService,
    private movieService:MovieService,
    private surveyService:SurveyService
  ) {

  }
  ngOnInit(): void {
    this.AdminService.getSiteSettings().subscribe(resp => {
      this.SocialDto = resp;
      console.log(this.SocialDto);
    });
  
    if (this.localService.getItem("settings")) {
      this.homePageSettings = this.localService.getItem("settings");
    } else {
      this.AdminService.getHomePageSettings().subscribe(resp => {
        this.localService.setItem("settings", resp);
        this.homePageSettings = resp;
        this.loadAdditionalData(); // Veri yüklendikten sonra ek verileri yükle
      });
    }
  
    // Eğer `homePageSettings` localStorage'dan yüklendiyse ek verileri hemen yükleyin
    if (this.homePageSettings) {
      this.loadAdditionalData();
    }
  }
  
  private loadAdditionalData(): void {
    if (this.homePageSettings && this.homePageSettings.imdbAppStoryId) {
      this.AdminService.getStoryIds(this.homePageSettings.imdbAppStoryId).subscribe(resp => {
        this.StoryModel = resp;
      });
    }
  
    if (this.homePageSettings && this.homePageSettings.carouselId) {
      this.movieService.getMovieIds(this.homePageSettings.carouselId).subscribe(resp => {
        this.movieModel = resp;
      });
    }

    if (this.homePageSettings && this.homePageSettings.surveyId) {
    
    this.surveyService.getbyId(this.homePageSettings.surveyId).subscribe(resp=>
      this.surveyModel = resp
    )
    }
  }

  oyVer(): void {
    if (this.selectedOptionId !== undefined) {
      // Seçilen oy id'sini kullanarak oy verme işlemini gerçekleştir
    this.surveyService.vote(this.selectedOptionId).subscribe(resp=>   alert("Oyunuz başarıyla kullanıldı"));
  
    } else {
      alert('Lütfen bir seçenek seçin.');
    }
  }
  
  
}
