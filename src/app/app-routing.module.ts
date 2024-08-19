import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MoviesComponent } from './movies/movies.component';
import { MovieDetailsComponent } from './movie-details/movie-details.component';

import { AdminComponent } from './admin/admin.component';
import { AddMoviesComponent } from './admin/add-movies/add-movies.component';
import { AuthComponent } from './user/auth/auth.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';

const routes: Routes = [

  {path:'movies', component: MoviesComponent},
  {path:'', redirectTo:'home', pathMatch:'full'},
  {path:'movies/category/:id', component:MoviesComponent},
  {path:'movies/:id', component:MovieDetailsComponent},
  {path:'auth' , component:AuthComponent},
  {path:'home', component:HomeComponent},
  {path:'about', component:AboutComponent},

  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
