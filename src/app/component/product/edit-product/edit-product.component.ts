import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ProductService} from '../product.service';
import {Subscription} from 'rxjs';
import {Product} from '../Product';

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.scss']
})
export class EditProductComponent implements OnInit {
  product: Product;
  constructor(private router: Router , private productService: ProductService , private activate: ActivatedRoute) { }

  ngOnInit() {
    const id = +this.activate.snapshot.paramMap.get('id');
    this.productService.detailsProduct(id).subscribe( next =>  {
      this.product = next;
    }, error => {
      console.log(error);
    });
  }
    backToList() {
    this.router.navigate(['listProduct']);
    }
  }
