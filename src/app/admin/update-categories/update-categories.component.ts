import { Component, Inject, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../model/category.model';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-update-categories',
  templateUrl: './update-categories.component.html',
  styleUrl: './update-categories.component.scss'
})
export class UpdateCategoriesComponent implements OnInit {

  category: CategoryModel;
 
  constructor(
    private categoryService: CategoryService,
    
  @Inject(MAT_DIALOG_DATA) public data:CategoryModel
  ) { }
  ngOnInit(): void {

   var categori_Id:any;
   categori_Id=this.data

     
   this.categoryService.getCategoriesById(categori_Id.item).subscribe(data2 => { this.category = data2 });
  }
  updateCategory(category_Id:any, categorName:any ){


  
 var category:CategoryModel={
  id: category_Id.value,
  name: categorName.value
 }

    return this.categoryService.updateCategory(category).subscribe(data => console.log(data));
  }
}
