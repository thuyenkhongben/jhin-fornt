import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../../service/category.service';
import {Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Category} from '../category';

@Component({
  selector: 'app-create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss']
})
export class CreateCategoryComponent implements OnInit {
  categoryForm: Category;
  isSuccess = false;
  form = new FormGroup({
  categoryName: new FormControl('', [Validators.required , Validators.minLength(2)])
  });
  constructor(private categoryService: CategoryService , private router: Router ) { }

  ngOnInit() {
    this.form = new FormGroup({
      categoryName: new FormControl('', [Validators.required , Validators.minLength(1)])
    });
  }
  onSubmit() {
    const {categoryName} = this.form.value;
    this.categoryForm = new Category(categoryName);
    this.categoryService.createCategory(this.categoryForm).subscribe(
      data => {
        this.isSuccess = true;
        this.router.navigate(['listCategory']);
        console.log('successfully');
      }, error => {
        console.log('initialization ');
      }
    );
  }

}
