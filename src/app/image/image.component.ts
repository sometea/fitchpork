import { Component, OnInit, Input } from '@angular/core';
import { ImagesStorageService } from '../images-storage.service';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  public imageUrl: string;
  public imageAlt: string;
  @Input() fileKey: string;

  constructor(private imagesStorageService: ImagesStorageService) { 
    this.imageAlt = 'No image loaded yet!';
  }

  ngOnInit() {
  }

  handleFiles(fileList: FileList) {
    if (fileList.length > 0) {
      this.imagesStorageService
        .delete(this.fileKey)
        .flatMap(() => this.imagesStorageService.upload(fileList.item(0)))
        .flatMap(key => {
          this.fileKey = key;
          return this.imagesStorageService.getUrl(key);
        }).subscribe(url => {
          this.imageUrl = url;
          this.imageAlt = 'image';
        });
    }
  }
}
