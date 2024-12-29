import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { OtherService } from '../../services/other.service';
import { delay } from 'rxjs';
import { LocalStorageService } from '../../services/local-storage.service';
import { DecodeService } from '../../services/decode.service';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrl: './vote.component.scss'
})
export class VoteComponent  implements OnInit{

  rating:{rate :number, movieId: number}
  bilgi:string="";
  ngOnInit(): void {

  
  }

  constructor(@Inject(MAT_DIALOG_DATA) public rate: {rate : number, movieId:number},
private otherService:OtherService,
private dialogRef: MatDialogRef<VoteComponent>,
private localStorage:LocalStorageService,
private decode:DecodeService
) {

    this.rating = rate // MAT_DIALOG_DATA'dan gelen veriyi rating nesnesine atıyoruz

  }

  selectedRating: number = 0;
  hoveredRating: number = 0;

  bilgiClass:boolean
  oyVer(ratePoint: number, movieId:number): void {
    this.selectedRating = ratePoint;
   
    let user= this.localStorage.getItem("User") //token getirdik
    let bilgi=this.decode.DecodeToken(user.token) //tokeni coz 

    this.otherService.Vote(movieId, ratePoint, bilgi.nameid).subscribe((data:any) => {
      
      if(data.isSucceed==true)
        this.bilgiClass=true
      else
      this.bilgiClass=false

     this.bilgi=data.message


      setTimeout(() => {
        this.dialogRef.close();
      }, 1500);
      
    });

}

  hoverRating(rating: number): void {
    this.hoveredRating = rating;
   
  }

  resetHover(): void {
    this.hoveredRating = 0;
  }

}
