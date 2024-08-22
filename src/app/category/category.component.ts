import { ChangeDetectorRef, Component, inject, OnInit } from '@angular/core';
import { CategoryModel } from '../model/category.model';
import { CategoryService } from '../services/category.service';
import { MatDialog } from '@angular/material/dialog';

import { MyListComponent } from '../movies/my-list/my-list.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrl: './category.component.scss',
  providers: [CategoryService]
})

export class CategoryComponent implements OnInit {
  readonly dialog = inject(MatDialog);
  categories: CategoryModel[];
  selectedCategory: CategoryModel | null = null ;
  displayAll = true;

  constructor(
    private CategoryService: CategoryService,
    private cdr: ChangeDetectorRef,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    // Kategorileri getirme
    this.CategoryService.getCategories().subscribe(data => {
      this.categories = data;

      // URL'den parametreyi al
      this.route.paramMap.subscribe(params => {
        const categoryId = params.get('id');
        
        if (categoryId) {
          // Parametre varsa ilgili kategoriyi seç
          const selected = this.categories.find(cat => cat.id === +categoryId);
          if (selected) {
            this.selectCategory(selected);
          }
        } else {
          // Parametre yoksa 'Tüm Kategoriler' seçili olsun
          this.selectCategory(null);
        }
      });
    });
  }

  selectCategory(item?: CategoryModel) {
    if (item != null) {
      this.selectedCategory = item;
      this.displayAll = false;
    } else {
      this.displayAll = true;
      this.selectedCategory = null;
    }
    this.cdr.detectChanges(); // Değişiklik algılamayı tetikle
  }

  openMyList() {

    return this.dialog.open(MyListComponent);
  }
  //adminsayfa kontrol
  adminCheck(): boolean {
    return true;
  }

}
