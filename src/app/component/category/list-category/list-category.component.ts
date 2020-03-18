import { Component, OnInit } from '@angular/core';
import {Category} from '../category';
import {CategoryService} from '../category.service';
import {Subscription} from 'rxjs';

@Component({
  selector: 'app-list-category',
  templateUrl: './list-category.component.html',
  styleUrls: ['./list-category.component.scss']
})
export class ListCategoryComponent implements OnInit {
  isDeleteSuccess = false;
  public subscription: Subscription;
  public category: Category[];
  constructor(private categoryService: CategoryService) { }

  ngOnInit() {
    this.getAllCategory();
  }
  onDeleteCategory(id: number) {
    this.subscription = this.categoryService.deleteCategory(id).subscribe(
      (data: Category) => {
    this.upDateData(id);
      }
    );
    this.getAllCategory();
    this.isDeleteSuccess = true;
  }
  upDateData(id: number) {
    for ( let i = 0 ; i < this.category.length ; i ++) {
      if (this.category[i].categoryId === id) {
        this.category.slice(i , 1);
        break;
      }
    }
  }
  getAllCategory() {
    this.subscription = this.categoryService.listCategory().subscribe(
      data => {
        this.category = data;
      }
    );
  }

}
