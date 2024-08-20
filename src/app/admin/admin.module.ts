import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';
import { MenuComponent } from './menu/menu.component';
import { AddMoviesComponent } from './add-movies/add-movies.component';
import { AddCategoryComponent } from './add-category/add-category.component';
import { GetMoviesComponent } from './get-movies/get-movies.component';
import { GetCategoriesComponent } from './get-categories/get-categories.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatNativeDateModule } from '@angular/material/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { UpdateCategoriesComponent } from './update-categories/update-categories.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { UpdateMoviesComponent } from './update-movies/update-movies.component';
import {MatTabsModule} from '@angular/material/tabs';
import {MatExpansionModule} from '@angular/material/expansion';
import { StatisticComponent } from './statistic/statistic.component';
import { SettingsComponent } from './settings/settings.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { AddActorComponent } from './add-actor/add-actor.component';
import { UpdateActorComponent } from './update-actor/update-actor.component';


@NgModule({
  declarations: [
    AdminComponent,
    MenuComponent,
    AddMoviesComponent,
    AddCategoryComponent,
    GetMoviesComponent,
    GetCategoriesComponent,
    UpdateCategoriesComponent,
    UpdateMoviesComponent,
    StatisticComponent,
    SettingsComponent,
    AddActorComponent,
    UpdateActorComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    MatNativeDateModule,
    DatePipe,
    FormsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatExpansionModule,
    MatPaginatorModule

  
  ]
})
export class AdminModule { }
