import { Component, OnInit, Input } from '@angular/core';
import { ImagesStorageService } from '../images-storage.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  public imageUrl: string;
  public imageAlt: string;
  private fileKey: string;

  constructor(
    private imagesStorageService: ImagesStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.imageAlt = 'No image loaded yet!';
  }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      this.fileKey = params.get('id');
      return this.imagesStorageService.getUrl(this.fileKey);
    }).subscribe(url => {
      this.imageUrl = url;
    });
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
