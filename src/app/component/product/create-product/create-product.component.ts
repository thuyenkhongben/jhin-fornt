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
import {PictureService} from '../picture.service';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  isSuccess: boolean;
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
              private pictureService: PictureService) {
  }

  ngOnInit() {
    this.formListCategory();
    this.formProduct();
    // this.productService.listCategory().subscribe(data => {
    //   this.listCategory = data;
    // }, error => {
    //   console.log(error);
    // });
    // this.createProductForm = this.fb.group({
    //   pictures: ['', [Validators.required]],
    //   nameProduct: ['', [Validators.required]],
    //   amount: ['', [Validators.required, Validators.min(1)]],
    //   descriptionProduct: ['', [Validators.required]],
    //   priceProduct: ['', [Validators.required, Validators.min(1)]],
    //   categoryName: ['', [Validators.required]]
    // });
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
    this.product = {
      nameProduct: this.createProductForm.get('nameProduct').value,
      priceProduct: this.createProductForm.get('priceProduct').value,
      amount: this.createProductForm.get('amount').value,
      descriptionProduct: this.createProductForm.get('descriptionProduct').value,
      category: this.category = { categoryId: this.createProductForm.get('categoryName').value},
      statusProduct: true
    };
  }

  create() {
    this.formProductConvert();
    this.productService.createProduct(this.product).subscribe(
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
