import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OtherService } from '../../services/other.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent  implements OnInit{

  rating:{rate :number, movieId: number}
  bilgi:string;
  ngOnInit(): void {
  }

  constructor(@Inject(MAT_DIALOG_DATA) public rate: {rate : number, movieId:number},
private otherService:OtherService,
private dialogRef: MatDialogRef<VoteComponent>
) {

    this.rating = rate // MAT_DIALOG_DATA'dan gelen veriyi rating nesnesine atıyoruz

  }

  selectedRating: number = 0;
  hoveredRating: number = 0;
  oyVer(ratePoint: number, movieId:number): void {
    console.log(ratePoint);
    this.selectedRating = ratePoint;
   var userId=0 //Kullanıcı olmayan user'lar 0 olarak geçicek
    this.otherService.Vote(movieId, ratePoint,userId).subscribe((data:any) => {
      this.bilgi=data.message
      setTimeout(() => {
        this.dialogRef.close();
      }, 750);
      
    });

}

  hoverRating(rating: number): void {
    this.hoveredRating = rating;
   
  }

  resetHover(): void {
    this.hoveredRating = 0;
  }

}
