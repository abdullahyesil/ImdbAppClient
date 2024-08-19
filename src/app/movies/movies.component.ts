import { Component, inject, OnInit } from '@angular/core';
import { MoviesModel } from '../model/movies.model';
import localeTr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';
import { AlertifyServiceService } from '../services/alertify-service.service';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MyListComponent } from './my-list/my-list.component';
import { VoteComponent } from './vote/vote.component';
import { error } from 'console';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrl: './movies.component.scss',
  providers: [MovieService]
})
export class MoviesComponent implements OnInit{


  ListNo:number= 1 //Listeleme için Varsayılan görünüm
  filterText:string = "";
  movies: MoviesModel[] = [];
  filtredMovies: MoviesModel[];
  readonly dialog = inject(MatDialog);
  loading : boolean = false;
  title="Film listesi";
error:any;


  constructor(
    public alertify:AlertifyServiceService,
    private MovieService:MovieService,
    private activatedRoute: ActivatedRoute,
     // getMovies içine duruma bağlı değer göndermek için tanımladık.
     ){
    /* this.movieRepository= new MovieRepository(); 
    this.movies= this.movieRepository.getMovies();
    this.filtredMovies = this.movies;*/
    registerLocaleData(localeTr);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=> {
      this.loading = true;
      this.MovieService.getMovies(params["id"]).subscribe(data => {
        this.movies = data;
        this.filtredMovies = this.movies;
        console.log(this.movies);
        console.log(this.filtredMovies); 
        this.loading= false;
    }, error => this.error = error);

    });  



/*
    this.activatedRoot.params.subscribe(params => {
      const id = Number(params['categoryid']); // Bu id category/:id route'undan gelen id'yi temsil eder
        console.log('Category ID:', id);
        if (id) {
            this.MovieService.getMovies(id).subscribe(
                (data) => {
                    this.movies = data;
                    this.filtredMovies = this.movies;
                    console.log(this.movies);
                    console.log(this.filtredMovies);
                }
            );
        } else {
            // Eğer id parametresi yoksa (movies route'u için)
            this.MovieService.getMovies().subscribe(
                (data) => {
                    this.movies = data;
                    this.filtredMovies = this.movies;
                    console.log(this.movies);
                    console.log(this.filtredMovies);
                }
            );
        }
    }); */
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

addToList($event:any, item: MoviesModel){
console.log("Butona tıklandı." + item.movieName);
console.log($event.target.classList);

  if ($event.target.classList.contains("btn-primary")) {
    $event.target.innerText = "Listeden çıkar";
    $event.target.classList.remove("btn-primary");
    $event.target.classList.add("btn-danger");
    this.alertify.succes(item.movieName+ ' listene eklendi.');
    let mylistitems= this.getMyListFromLS();
    mylistitems.push(item)
    localStorage.setItem("mylist",JSON.stringify(mylistitems));
    /*
    if(localStorage.getItem != null){

      localStorage.setItem("mylist", localStorage.getItem+JSON.stringify(item));
      console.log("boş değil")
    }
    else{
      localStorage.setItem("mylist", JSON.stringify(item));
    } */
    
  }
  else{
    $event.target.innerText = "Listeye Ekle";
    $event.target.classList.remove("btn-danger");
    $event.target.classList.add("btn-primary");
    
    this.alertify.error(item.movieName+ ' listenden çıkarıldı.');

    this.deleteMyListFromLs(item);
    
  }

}
  getMyListFromLS() {
   let items:MoviesModel[] = [];
   
   let value = localStorage.getItem('mylist')
   if(value != null){

    items = JSON.parse(value);
   }

   return items;
  }

  deleteMyListFromLs(item: MoviesModel){
    const data = JSON.parse(localStorage.getItem('mylist')) || [];
    const newData = data.filter((depo: { id: number; })=> depo.id !== item.id)
    localStorage.setItem('mylist', JSON.stringify(newData));    
  }



   //Uzun versiyon
   Listedezatenvarmi(item: MoviesModel):boolean{
    if (typeof window !== 'undefined') {
      const data = JSON.parse(localStorage.getItem('mylist')) || [];
      return data.some((listItem: MoviesModel) => listItem.id === item.id);
    }
      return false
 
    }

    openVote(rate:number, movieId:number){
      
    const diagloRef= this.dialog.open(VoteComponent ,{ data: {rate:rate, movieId:movieId}
    });
    

    }


    Listeleme(value:number){
        this.ListNo=value
    }

  

}
