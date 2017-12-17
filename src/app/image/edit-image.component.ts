import { Component, OnInit, Input } from '@angular/core';
import { ImagesStorageService } from '../images-storage.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Image } from './image';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {
  private imageUrl: string;
  private imageAlt: string;
  private key: string;
  private title: string;

  constructor(
    private imagesStorageService: ImagesStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.imageAlt = 'No image loaded yet!';
    this.title = '';
  }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      this.key = params.get('id');
      return this.imagesStorageService.getUrl(this.key);
    }).subscribe(url => {
      this.imageUrl = url;
    });
  }

  handleFiles(fileList: FileList) {
    if (fileList.length > 0) {
      const image: Image = {
        title: this.title,
        filename: '',
      };
      this.imagesStorageService
        .delete(this.key)
        .flatMap(() => this.imagesStorageService.upload(fileList.item(0), image))
        .flatMap(key => {
          this.key = key;
          return this.imagesStorageService.getUrl(key);
        }).subscribe(url => {
          this.imageUrl = url;
          this.imageAlt = 'image';
        });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
