import { Component, OnInit } from '@angular/core';
import { OtherService } from '../../services/other.service';
import { voteInfoModel } from '../../model/voteInfo.model';
import { MoviesModel } from '../../model/entities/movies.model';
import { MovieService } from '../../services/movie.service';
import { StatisticModel } from '../../model/entities/statistic';
import { PaginatorState } from 'primeng/paginator';

@Component({
  selector: 'app-statistic',
  templateUrl: './statistic.component.html',
  styleUrl: './statistic.component.scss'
})
export class StatisticComponent implements OnInit {


onPageChange() {
this.page = this.page+1
this.loadStatistic(this.page, this.size)

}

  statisticModel:StatisticModel = {
    movieTotalCount: 0,
    regUserTotalCount: 0,
    ofVotesTotalCount:0,
    statistics:[{
      oyId:0,
      movieName:"",
      userName:"",
      useVote:0,
    }]
  }
  page:number=0
  size:number=20

  constructor(
    private otherService:OtherService
  ){
    this.loadStatistic(this.page,this.size)
  }

  ngOnInit(): void {
      
   
  }

  loadStatistic(page:number,size:number){
    this.otherService.getStatistic(page,size).subscribe(resp=> 
      this.statisticModel = resp
      )
  }
  


  

}
