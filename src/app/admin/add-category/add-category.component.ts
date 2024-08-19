import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { CategoryModel } from '../../model/category.model';
import { AlertifyServiceService } from '../../services/alertify-service.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent implements OnInit {


constructor(private categoryService: CategoryService,
  private alertify: AlertifyServiceService
){


}

  ngOnInit(): void {
    
  }

  addCategory(categoryName:any){

     var category: CategoryModel = {
        name: categoryName.value
      };

    this.categoryService.addCategory(category).subscribe(data => {
      if(data && data.message)
        {
            this.alertify.succes(data.message);
        }
     },
      error => {
        console.error('Bir hata oluştu:', error);
        this.alertify.error('İşlem sırasında bir hata oluştu');
      }
    );
  
  }
}
