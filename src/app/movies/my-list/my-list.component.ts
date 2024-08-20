import { Component, OnInit } from '@angular/core';
import { MoviesModel } from '../../model/entities/movies.model';

@Component({
  selector: 'app-my-list',
  templateUrl: './my-list.component.html',
  styleUrl: './my-list.component.scss'
})
export class MyListComponent implements OnInit {

mylist: MoviesModel[];
  constructor(){
    

  }

  ngOnInit(): void {
   
   this.mylist = JSON.parse(localStorage.getItem("mylist"));
   console.log(this.mylist)
  }


}
