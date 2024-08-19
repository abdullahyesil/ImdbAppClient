import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserauthService } from '../../services/userauth.service';
import { Router } from '@angular/router';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthResponse } from '../../model/authResponse';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss'
})
export class AuthComponent implements OnInit {

  isLoginMode: boolean = true; //toggle buton için loginmode
  loading: boolean = false; //loading animasyonu için
  error:string="";

  constructor(private authService: UserauthService,
    private router:Router,
  ) {
  
  }

  ngOnInit(): void {

  }

  onToggleMod() { //toggle butona bastığında

    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm){

      if(form.invalid)

        return;

        if(this.isLoginMode)
          {

            let authResponse: Observable<AuthResponse>
        const email= form.value.email;
        const password= form.value.password;
            this.loading=true
            authResponse= this.authService.login(email,password)
           authResponse.subscribe( response => {
          this.loading=false;
          this.router.navigate(['/movies']);
        
          console.log(response); // Sunucudan dönen cevabı konsola yazdır
          // İşlemleri buraya ekleyebilirsiniz: Örneğin, kullanıcıyı başka bir sayfaya yönlendirme
        } ,
        error => {
          console.error('Login error:', error); // Hata durumunda konsola hata mesajını yazdır
          // Hata mesajını kullanıcıya göstermek için bir mekanizma eklenebilir
         
          this.error =  error.error.message;
          this.loading=false;
        }
      );
      
    
      form.reset();

      }
      
  }
}
