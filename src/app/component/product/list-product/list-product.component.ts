import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {ProductService} from '../product.service';
import {Category} from '../../category/category';
import {error} from 'util';
import {Product} from '../Product';
import {PictureService} from '../picture.service';
import {Picture} from '../interface/Picture';
import {TokenStogeService} from '../../../auth/token-stoge.service';

@Component({
  selector: 'app-list-product',
  templateUrl: './list-product.component.html',
  styleUrls: ['./list-product.component.scss']
})
export class ListProductComponent implements OnInit {
  private roles: string[];
  private authority: string;
  private info: any;
  listProduct: Product[];
  product: Product;
  listCategory: Category[];
  category: Category;
  listPictures: Picture[];
  constructor(private router: Router , private productService: ProductService ,
              private pictureService: PictureService , private token: TokenStogeService
  ) { }

  ngOnInit() {
    this.listByCategory();
    this.allProduct();
    this.allPicture();
    this.checkInfor();
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
  allPicture() {
    this.pictureService.listPicture().subscribe( data => {
      this.listPictures  = data;
    }, error1 => {
      console.log(error1);
    } );
  }
  searchCategory(id: number) {}
  checkInfor() {
    this.roles = this.token.getAuthorities();
    for (const role of this.roles) {
      if (role === 'ADMIN') {
        return this.authority = 'host';
      } else if (role === 'USER') {
        return this.authority = 'user';
      }
    }
  }
}
