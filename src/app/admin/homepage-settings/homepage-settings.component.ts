import { Component, inject, OnInit } from '@angular/core';
import { SurveyService } from '../../services/survey.service';
import { SurveysModel } from '../../model/entities/surveys/surveys';
import { MoviesModel } from '../../model/entities/movies.model';
import { MovieService } from '../../services/movie.service';
import { AdminService } from '../../services/admin.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AddStoryComponent } from '../add-story/add-story.component';
import { imdbStoryModel } from '../../model/entities/imdbStory';
import { AlertifyServiceService } from '../../services/alertify-service.service';

@Component({
  selector: 'app-homepage-settings',
  templateUrl: './homepage-settings.component.html',
  styleUrls: ['./homepage-settings.component.scss']
})
export class HomepageSettingsComponent implements OnInit {



  isSurvey: boolean = false;
  isImdbStory: boolean = false;
  isCarousel: boolean = false;
  surveyId: number | null = null;
  selectedSurveyId: number | null = null;
  selectedStoryIds: number[] = [];
  survey: SurveysModel[];
  movieModel: MoviesModel[];
  selectedMovies: MoviesModel[] = [];
  pageIndex: number = 0;
  size: number = 5;
  settingsForm: FormGroup;
  imdbStoryModel:imdbStoryModel[] = []
readonly dialog = inject(MatDialog)
  constructor(
    private surveyService: SurveyService,
    private movieService: MovieService,
    private adminService: AdminService,
    private alertify: AlertifyServiceService,
    private fb: FormBuilder,
  ) {}

  ngOnInit(): void {
    // Formu ve validasyon kurallarını oluşturma
    this.settingsForm = this.fb.group({
      id: [null, Validators.required],
      h1Name: ['', Validators.required],
      surveys: [false],
      surveyId: [{ value: '', disabled: true }, Validators.required],
      imdbAppStory: [true],
      imdbAppStoryId: [],
      carousel: [false],
      carouselBaslik: [{ value: '', disabled: true }, Validators.required],
      carouselId: [],
     });


    // API'den ayarları yükleme
    this.adminService.getHomePageSettings().subscribe(resp => {

      this.isSurvey = resp.surveys
      this.isImdbStory = resp.imdbAppStory
      this.isCarousel = resp.carousel
      if(this.isImdbStory)
      this.loadStory();

      // Formdaki mevcut değerleri güncelle
      this.settingsForm.patchValue({
        id:resp.id,
        surveys: resp.surveys,
        imdbAppStory: resp.imdbAppStory,
        carousel: resp.carousel,
        h1Name:resp.h1Name,
        surveyId:resp.surveyId,
        imdbAppStoryId:resp.imdbAppStoryId,
        carouselBaslik:resp.carouselBaslik,
        carouselId:resp.carouselId

      });

      this.toggleFormFields(); // Form alanlarını etkinleştir veya devre dışı bırak
    });

    this.surveyService.getAll().subscribe(resp => (this.survey = resp));
  }

  updateCarouselIds(): void {
    const idsArray = this.selectedMovies.map(movie => movie.id);
    this.settingsForm.get('carouselId').setValue(idsArray);
  }

  // Form alanlarının etkinleştirilmesi veya devre dışı bırakılması
  toggleFormFields(): void {
    if (this.isSurvey) {
      this.settingsForm.get('surveyId').enable();
    } else {
      this.settingsForm.get('surveyId').disable();
    }

    if (this.isImdbStory) {
      this.settingsForm.get('imdbAppStoryId').enable();
    } else {
      this.settingsForm.get('imdbAppStoryId').disable();
    }

    if (this.isCarousel) {
      this.settingsForm.get('carouselBaslik').enable();
    } else {
      this.settingsForm.get('carouselBaslik').disable();
    }
  }

  openSurvey(value: boolean): void {
    this.isSurvey = !value;
    this.toggleFormFields();
  }

  openStory(value: boolean): void {
    this.isImdbStory = !value;
    this.toggleFormFields();
    this.loadStory()
  }

  openCarousel(value: boolean): void {
    this.isCarousel = !value;
    this.toggleFormFields();
  }

  search(event: string): void {
    this.loadMovie(this.pageIndex, this.size, event);
  }

  loadStory(){
    this.adminService.getStory().subscribe(resp=> this.imdbStoryModel = resp)
  }

  loadMovie(page: number, size: number, searchKey?: string): void {
    this.movieService.getMoviesPage(page, size, searchKey).subscribe(resp =>
      this.movieModel = resp.movies
    );
  }

  ekle(movie: any) {
    // Seçilen filmi tabloya ekler
    if (!this.selectedMovies.some(m => m.id === movie.id)) {
      this.selectedMovies.push(movie);
      this.updateCarouselIds(); // Film eklendiğinde carouselId'yi güncelle
    }
  }

  cikar(movie: any) {
    // Filmi tablodan çıkarır
    this.selectedMovies = this.selectedMovies.filter(m => m.id !== movie.id);
    this.updateCarouselIds(); // Film çıkarıldığında carouselId'yi güncelle
  }

  setSurveyId(id: number) {
    this.surveyId = id;
    this.selectedSurveyId = id;

    this.settingsForm.patchValue({
      surveyId:this.selectedSurveyId,
    });
  }

  isSurveySelected(id: number): boolean {
    return this.selectedSurveyId === id;  // Seçilen anket ID'si ile kontrol
  }

  // Formu gönderme işlemi
  onSubmit(): void {
          
    console.log(this.settingsForm.value)
    if (this.settingsForm.valid) {
      console.log('Form Submitted!', this.settingsForm.value);
        this.adminService.updateHomePage(this.settingsForm.value).subscribe(resp=> 

         {if(!!resp.isSucceed){

            this.alertify.succes(resp.message)
         }

         else{
            this.alertify.warning("Bilinmeyen hata")
         }

       }) 
    } else {
      this.alertify.error("Form geçerli değil. Lütfen kontrol ediniz")
    }
  }

  openDialog() {
    const dialogRef = this.dialog.open(AddStoryComponent);

    dialogRef.afterClosed().subscribe(result => {
      this.loadStory();
   
    });
  }


  
icindemi(id: number): boolean {
  return this.selectedStoryIds.includes(id);
}

toggleSelection(id: number): void {
  const index = this.selectedStoryIds.indexOf(id);
  if (index > -1) {
    // Eğer id zaten listede varsa, onu listeden çıkar
    this.selectedStoryIds.splice(index, 1);
  } else {
    // Eğer id listede yoksa, onu listeye ekle
    this.selectedStoryIds.push(id);
  }

  // Formdaki imdbStoryId alanını güncelle
  this.settingsForm.patchValue({
    imdbAppStoryId: this.selectedStoryIds, // imdbStoryId'yi imdbAppStoryId ile değiştirdim
  });


}


}
