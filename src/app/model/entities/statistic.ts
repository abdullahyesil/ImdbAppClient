export interface StatisticModel{

    regUserTotalCount:number,
    movieTotalCount: number,
    ofVotesTotalCount: number,
    statistics: 
      [  {oyId: number,
        movieName: string,
        userName: string,
        useVote: number}]
       
      

}