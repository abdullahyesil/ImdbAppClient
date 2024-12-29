import { Component, inject, OnInit } from '@angular/core';
import { LoginService } from '../services/loginservice';
import { MatDialog } from '@angular/material/dialog';
import { AuthComponent } from '../user/auth/auth.component';
import { LocalStorageService } from '../services/local-storage.service';
import { DecodeService } from '../services/decode.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit{
  isAdmin= false;
  isAuthenticated: boolean = false
  username:string = ""
  readonly dialog = inject(MatDialog);
  constructor(
    private authService: LoginService,
    private localStorage: LocalStorageService,
    private decoder:DecodeService

  ){
    this.authService.user$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.username = user ? user.id : "";
    });
    if(this.localStorage.getItem("User")){
      let User:any = this.localStorage.getItem("User")
    var info:any = this.decoder.DecodeToken(User.token)
    if(info.role)
    {
      info.role === "Admin"
      this.isAdmin = true

    }
      console.log(decoder.DecodeToken(User.token))
    }


  }

  ngOnInit(): void {}

  openDialog() {
    const dialogRef = this.dialog.open(AuthComponent);
    }

    cikisYap(){
      this.authService.logout();
      this.openDialog();
    }

}
