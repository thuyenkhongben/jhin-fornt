import { Component, OnInit } from '@angular/core';
import {Product} from '../Product';
import {Picture} from '../interface/Picture';
import {Category} from '../../category/category';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AngularFireDatabase} from '@angular/fire/database';
import {ProductService} from '../product.service';
import {HttpClient} from '@angular/common/http';
import {PictureService} from '../picture.service';
import * as firebase from 'firebase';


@Component({
  selector: 'app-update-product',
  templateUrl: './update-product.component.html',
  styleUrls: ['./update-product.component.scss']
})
export class UpdateProductComponent implements OnInit {
  isSuccess: boolean;
  id: number;
  idProduct = '';
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
              private fb: FormBuilder,
              private pictureService: PictureService,
              private activate: ActivatedRoute) {
  }

  ngOnInit() {
    this.findIdProduct();
    this.formListCategory();
    this.formProduct();
  }
  findIdProduct() {
    // const id = +this.activate.snapshot.paramMap.get('id');
    // this.productService.detailsProduct(id).subscribe( next =>  {
    //   this.product = next;
    // }, error => {
    //   console.log(error);
    // });
    this.id = this.activate.snapshot.params.id;
    this.productService.detailsProduct(this.id)
      .subscribe(data => {
        this.product = data;
      }, error => console.log(error));
  }
  backToList() {
    this.router.navigate(['listProduct']);
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

  formProductConvert() {
    console.log(this.createProductForm);
    this.findIdProduct();
    this.product = {
      nameProduct: this.createProductForm.get('nameProduct').value,
      priceProduct: this.createProductForm.get('priceProduct').value,
      amount: this.createProductForm.get('amount').value,
      descriptionProduct: this.createProductForm.get('descriptionProduct').value,
      category: this.category = { categoryId: this.createProductForm.get('categoryName').value},
      statusProduct: true
    };
  }

  updateProduct() {
    this.formProductConvert();
    console.log(this.product);
    this.productService.updateP(this.id , this.product).subscribe(
      result => {
        this.idProduct =  result.data.productId;
        this.router.navigate(['api/listManagement']);
      }, error => {
        this.isSuccess = false;
        console.log('loi');
      }
    );
  }

  uploadFile(event) {
    // this.create();
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
          this.picture = {namePicture: downloadURL ,
            product: this.product  = {
              amount: 0,
              category: undefined,
              descriptionProduct: '',
              nameProduct: '',
              priceProduct: 0,
              statusProduct: false,
              productId: this.idProduct} };
          this.pictureService.createPicture(this.picture).subscribe( result => {
            this.isSuccess  = true;
            console.log(result);
          }, error => {
            console.log(error);
          });
        });
      }
    );
  }
}


