import { Component, inject, OnInit } from '@angular/core';
import { MoviesModel } from '../model/entities/movies.model';
import localeTr from '@angular/common/locales/tr';
import { registerLocaleData } from '@angular/common';
import { AlertifyServiceService } from '../services/alertify-service.service';
import { MovieService } from '../services/movie.service';
import { ActivatedRoute } from '@angular/router';

import { MatDialog } from '@angular/material/dialog';
import { MyListComponent } from './my-list/my-list.component';
import { VoteComponent } from './vote/vote.component';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss'],
  providers: [MovieService]
})
export class MoviesComponent implements OnInit {

  ListNo: number = 1;
  filterText: string = "";
  movies: MoviesModel[] = [];
  filtredMovies: MoviesModel[] = [];
  readonly dialog = inject(MatDialog);
  loading: boolean = false;
  title = "Film listesi";
  error: any;
  
totalCount:number= 0;
  first: number = 0;
  rows: number = 10;
pageIndex:number = 0;
  constructor(
    public alertify: AlertifyServiceService,
    private movieService: MovieService,
    private activatedRoute: ActivatedRoute
  ) {
    registerLocaleData(localeTr);
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.loading = true;
      this.loadMovies(this.pageIndex, this.rows, this.filterText);
      if(params["id"] != null)
       {

        this.movieService.getMoviesPage(this.pageIndex, this.rows, this.filterText,params["id"] ).subscribe(resp=>
          {this.movies = resp.movies
          this.filtredMovies = resp.movies
          this.totalCount = resp.totalCount
          this.loading = false}
        )
       }
    });
  }

  loadMovies(page:number, size:number, searchKey:string, categoryId?:number) {

    this.movieService.getMoviesPage(page, size, searchKey).subscribe(resp=>
      {this.movies = resp.movies
      this.filtredMovies = resp.movies
      this.totalCount = resp.totalCount
      this.loading = false}
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

  onPageChange(event: PaginatorState) {
    this.first = event.first ?? 0;
    this.rows = event.rows ?? 10;
    this.pageIndex = event.first / event.rows;
    this.loadMovies(this.pageIndex, this.rows, this.filterText)
  
  }

  addToList(event: any, item: MoviesModel) {
    if (event.target.classList.contains("active")) {
      event.target.innerText = "Listeden çıkar";
      event.target.classList.remove("active");
      event.target.classList.add("delete");
      this.alertify.succes(item.movieName + ' listene eklendi.');
      let mylistitems = this.getMyListFromLS();
      mylistitems.push(item);
      localStorage.setItem("mylist", JSON.stringify(mylistitems));
    } else {
      event.target.innerText = "Listeye Ekle";
      event.target.classList.remove("btn-danger");
      event.target.classList.add("btn-primary");
      this.alertify.error(item.movieName + ' listenden çıkarıldı.');
      this.deleteMyListFromLs(item);
    }
  }

  getMyListFromLS() {
    let items: MoviesModel[] = [];
    let value = localStorage.getItem('mylist');
    if (value != null) {
      items = JSON.parse(value);
    }
    return items;
  }

  deleteMyListFromLs(item: MoviesModel) {
    const data = JSON.parse(localStorage.getItem('mylist')) || [];
    const newData = data.filter((depo: { id: number; }) => depo.id !== item.id);
    localStorage.setItem('mylist', JSON.stringify(newData));
  }

  Listedezatenvarmi(item: MoviesModel): boolean {
    if (typeof window !== 'undefined') {
      const data = JSON.parse(localStorage.getItem('mylist')) || [];
      return data.some((listItem: MoviesModel) => listItem.id === item.id);
    }
    return false;
  }

  openVote(rate: number, movieId: number) {
    const diagloRef = this.dialog.open(VoteComponent, { data: { rate: rate, movieId: movieId } });
  }

  Listeleme(value: number) {
    this.ListNo = value;
  }
}
