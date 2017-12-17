import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ImagesStorageService } from '../images-storage.service';
import { Image } from '../image/image';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.css']
})
export class ListImagesComponent implements OnInit {
  private images: Observable<Image[]>;
  
  constructor(private imagesService: ImagesStorageService) { }

  ngOnInit() {
    this.images = this.imagesService.list();
  }

}
