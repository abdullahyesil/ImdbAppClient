import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MoviesComponent } from './movies/movies.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { CategoryComponent } from './category/category.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { OzetPipe } from './pipes/ozet.pipe';
import { HTTP_INTERCEPTORS, provideHttpClient, withFetch } from '@angular/common/http';
import { AlertifyServiceService } from './services/alertify-service.service';
import { MovieDetailsComponent } from './movie-details/movie-details.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AddMoviesComponent } from './admin/add-movies/add-movies.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MyListComponent } from './movies/my-list/my-list.component';
import { VoteComponent } from './movies/vote/vote.component';
import { AuthService } from './services/auth.service';
import { MenuComponent } from './admin/menu/menu.component';
import { RouterModule } from '@angular/router';
import { AdminComponent } from './admin/admin.component';
import { LoadingComponent } from './other/loading/loading.component';
import { AuthComponent } from './user/auth/auth.component';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { AuthInterceptor } from './services/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { MetaKeyComponent } from './meta-key/meta-key.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import { PaginatorModule } from 'primeng/paginator';
@NgModule({
  declarations: [
    AppComponent,
    MoviesComponent,
    NavbarComponent,
    FooterComponent,
    CategoryComponent,
    OzetPipe,
    MovieDetailsComponent,
    MyListComponent,
    VoteComponent,
    LoadingComponent,
    AuthComponent,
    HomeComponent,
    AboutComponent,
    MetaKeyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonToggleModule,
    PaginatorModule
   

  ],
  providers: [
    // provideClientHydration(),
    { provide: LOCALE_ID, useValue: 'TR' },
    { provide: HTTP_INTERCEPTORS, useClass:AuthInterceptor, multi: true },
   
    AlertifyServiceService,
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    AuthService
  ]
  ,
  bootstrap: [AppComponent]
})
export class AppModule { }
