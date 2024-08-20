import { Component, inject, OnInit } from '@angular/core';
import { CategoryModel } from '../model/category.model';
import { CategoryService } from '../services/category.service';
import { MatDialog } from '@angular/material/dialog';

import { MyListComponent } from '../movies/my-list/my-list.component';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  providers: [CategoryService]
})

export class CategoryComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  categories: CategoryModel[];
  selectedCategory: CategoryModel = null;
  displayAll = true;

  constructor(
    private CategoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.CategoryService.getCategories().subscribe(data => {
      this.categories = data;
    });

  }


  selectCategory(item?: CategoryModel) {
  
    if (item != null) {

      this.selectedCategory = item;
      this.displayAll = false;
    }
    else {
      this.displayAll = true;
      this.selectedCategory = null;
    }

  }


  openMyList() {

    return this.dialog.open(MyListComponent);
  }
  //adminsayfa kontrol
  adminCheck(): boolean {
    return true;
  }

}
