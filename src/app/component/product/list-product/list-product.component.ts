import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../product.service';
import {Category} from '../../category/category';
import {error} from 'util';
import {Product} from '../Product';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  listProduct: Product[];
  product: Product;
  listCategory: Category[];
  category: Category;
  constructor(private router: Router , private productService: ProductService ,
  ) { }

  ngOnInit() {
    this.listByCategory();
    this.allProduct();
  }
  listByCategory() {
    this.productService.listCategory().subscribe( data => {
      this.listCategory = data;
      // tslint:disable-next-line:no-shadowed-variable
    }, error => {
      console.log(error);
    } );
  }
  allProduct() {
    this.productService.listProduct().subscribe(data => {
      this.listProduct = data;
      console.log(data);
    }, error1 => {
      console.log(error1);
    });
  }
  searchCategory(id: number) {}
  saveCart(product: Product) {}
}
