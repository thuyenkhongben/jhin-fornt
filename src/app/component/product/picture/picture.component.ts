import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {PictureService} from '../picture.service';

@Component({
  selector: 'app-picture',
  templateUrl: './picture.component.html',
  styleUrls: ['./picture.component.scss']
})
export class PictureComponent implements OnInit {
  constructor(private router: Router , private pictureService: PictureService) { }

  ngOnInit() {
  }

}
