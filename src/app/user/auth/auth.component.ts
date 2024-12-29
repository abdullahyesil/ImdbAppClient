import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/loginservice';
import { Router } from '@angular/router';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../model/authResponse';
import { MatDialogRef } from '@angular/material/dialog';
import { response } from 'express';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  loading: boolean = false; //loading animasyonu için
  error: string = "";

  constructor(private authService: LoginService,
    private router: Router,
    private dialogRef: MatDialogRef<AuthComponent>
  ) {

  }

  ngOnInit(): void {

  }


  onSubmit(form: NgForm) {
    if (form.invalid)
      return;

    const email = form.value.email;
    const password = form.value.password;
  
    this.loading = true
    this.authService.login(email, password).subscribe(response => {
      console.log(response)
      if (response.isSucceed == false) {
        this.loading = false;
        this.error = response.message
      }
      else{
        this.loading = false;
        this.dialogRef.close()
        this.router.navigate(['/movies']);
      }

    },
      error => {
        this.loading = false;
        this.error = error.isSucceed;
      }
    );


  }
}
