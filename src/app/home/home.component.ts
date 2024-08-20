import { Component, OnInit } from '@angular/core';
import { AdminService } from '../services/admin.service';
import { SocialMediaDto } from '../model/entities/DTO/socialMediaDTO';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  
  SocialDto:SocialMediaDto
  constructor(private AdminService:AdminService) {

  }
  ngOnInit(): void {
    this.AdminService.getSiteSettings().subscribe(resp=>{
     this.SocialDto =resp
      console.log(this.SocialDto)
    } )
  }

}
