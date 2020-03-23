import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {Picture} from '../interface/Picture';
import {ProductService} from '../product.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import {Category} from '../../category/category';
import {messaging} from 'firebase';
import {Product} from '../Product';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  isSuccess: boolean;
  product: Product;
  picture: Picture;
  listCategory: Category[];
  arrayPicture = [];
  createProductForm: FormGroup;
  category: Category;

  constructor(private router: Router,
              private db: AngularFireDatabase,
              private productService: ProductService,
              private  http: HttpClient,
              private fb: FormBuilder) {
  }

  ngOnInit() {
    this.formListCategory();
    this.formProduct();
  }

  formListCategory() {
    this.productService.listCategory().subscribe(data => {
      this.listCategory = data;
    }, error => {
      console.log(error);
    });
  }
  formProduct() {
    this.createProductForm = this.fb.group({
      nameProduct: ['', [Validators.required]],
      amount: ['', [Validators.required, Validators.min(1)]],
      descriptionProduct: ['', [Validators.required]],
      priceProduct: ['', [Validators.required, Validators.min(1)]],
      categoryName: ['', [Validators.required]],
    });
  }

  formConvert() {
    console.log(this.createProductForm);
    this.product = {
      pictures: this.arrayPicture,
      nameProduct: this.createProductForm.get('nameProduct').value,
      priceProduct: this.createProductForm.get('priceProduct').value,
      amount: this.createProductForm.get('amount').value,
      descriptionProduct: this.createProductForm.get('descriptionProduct').value,
      category: this.category = { categoryId: this.createProductForm.get('categoryName').value},
      statusProduct: true,
    };
  }

  create() {
    this.formConvert();
    console.log('>>>>>>>' + this.product);
    this.productService.createProduct(this.product).subscribe(
      data => {
        this.isSuccess = true;
        this.router.navigate(['api/listManagement']);
      }, error => {
        this.isSuccess = false;
        console.log('loi');
      }
    );
  }

  uploadFile(event) {
    const file = event.target.files;
    const metadata = {
      contentType: 'image/jpeg',
    };
    const uploadTask = firebase.storage().ref('img/' + Date.now()).put(file[0], metadata);
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
      (snapshot) => {
        // in progress
        const snap = snapshot as firebase.storage.UploadTaskSnapshot;
      },
      (error) => {
        console.log(error);
      },
      () => {
        uploadTask.snapshot.ref.getDownloadURL().then(downloadURL => {
          this.picture = {namePicture: downloadURL};
          console.log(downloadURL);
          this.arrayPicture.push(this.picture);
        });
      }
    );
  }
}
