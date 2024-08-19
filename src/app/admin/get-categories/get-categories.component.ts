import { Component, inject, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../model/category.model';
import { AlertifyServiceService } from '../../services/alertify-service.service';
import { MatDialog } from '@angular/material/dialog';
import { UpdateCategoriesComponent } from '../update-categories/update-categories.component';

@Component({
  selector: 'app-get-categories',
  templateUrl: './get-categories.component.html',
  styleUrl: './get-categories.component.scss'
})
export class GetCategoriesComponent implements OnInit {
  category: CategoryModel[];

  readonly dialog = inject(MatDialog);


  constructor(
    private categoryService: CategoryService,
    private alertify: AlertifyServiceService


  ) { }

  ngOnInit(): void {

    this.categoryService.getCategories().subscribe(data => {
      this.category = data
    });
  }

  deleteCategory(id:number){
  this.categoryService.deleteCategory(id).subscribe(data => this.alertify.error((data.message)));


  return this.categoryService.getCategories().subscribe(data => {
    this.category = data
  });
  }

  openUpdateModal(item:number){
    const diagloRef= this.dialog.open(UpdateCategoriesComponent ,{ data: {item}
    });
    
  }



}
