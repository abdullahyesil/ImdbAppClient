import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { AddMoviesComponent } from './add-movies/add-movies.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { GetMoviesComponent } from './get-movies/get-movies.component';
import { GetCategoriesComponent } from './get-categories/get-categories.component';
import { UpdateCategoriesComponent } from './update-categories/update-categories.component';
import { SettingsComponent } from './settings/settings.component';
import { AddActorComponent } from './add-actor/add-actor.component';
import { AddSurveyComponent } from './survey/add-survey/add-survey.component';

const routes: Routes = [
  { path: '', component: AdminComponent },
  { path: 'addMovie', component: AddMoviesComponent },
  { path: 'addCategory', component: AddCategoryComponent },
  { path: 'getMovies', component: GetMoviesComponent },
  { path: 'getCategories', component: GetCategoriesComponent },
  { path: 'settings', component: SettingsComponent },
  { path: 'addActor', component: AddActorComponent },
  { path:'addSurvey', component: AddSurveyComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
