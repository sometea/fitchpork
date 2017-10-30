import { Component, OnInit } from '@angular/core';
import { ImagesStorageService } from '../images-storage.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  public imageUrl: string;

  constructor(private imagesStorageService: ImagesStorageService) { }

  ngOnInit() {
  }

  handleFiles(fileList: FileList) {
    if (fileList.length > 0) {
      this.imagesStorageService
        .upload(fileList.item(0))
        .flatMap(filename => this.imagesStorageService.getUrl(filename))
        .subscribe(url => this.imageUrl = url);
    }
  }
}
