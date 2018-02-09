import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { ImagesStorageService } from '../images-storage.service';
import { Image, ImageWithKey } from '../image/image';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.css']
})
export class ListImagesComponent implements OnInit {
  public images: Observable<ImageWithKey[]>;
  
  constructor(
    private imagesService: ImagesStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.images = this.imagesService.list();
  }

  addImage() {
    const image: Image = {
      title: 'A test image',
      filename: '',
      url: '',
    };
    this.imagesService.add(image).subscribe(key => this.router.navigate(['/images/' + key]));
  }
}
