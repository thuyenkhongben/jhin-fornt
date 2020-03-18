import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import {AngularFireDatabase} from '@angular/fire/database';
import {Router} from '@angular/router';
import {Picture} from '../interface/Picture';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {
  picture: Picture;
  arrayPicture = [];
  constructor(private router: Router , private db: AngularFireDatabase) { }

  ngOnInit() {
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
          this.picture = {pictureName : downloadURL};
          console.log(downloadURL);
          this.arrayPicture.push(this.picture);
        });
      }
    );
  }
}
