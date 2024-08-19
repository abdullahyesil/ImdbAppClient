import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UserauthService } from '../services/userauth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isAuthenticated: boolean = false

  constructor(private authService: UserauthService){
  }

  ngOnInit(): void {
   this.authService.user.subscribe(user =>
    {
      this.isAuthenticated = !!user; // null
    }
   )
  }



}
