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
  private key: string;
  public imageAlt: string;
  public image: Image;

  constructor(
    private imagesStorageService: ImagesStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.imageAlt = 'No image loaded yet!';
    this.image = new Image();
  }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      this.key = params.get('id');
      return this.imagesStorageService.get(this.key);
    }).subscribe(image => {
      this.image = image;
    });
  }

  public handleFiles(fileList: FileList) {
    if (fileList.length < 0) {
      return;
    }
    this.image.filename = fileList.item(0).name;
    this.imagesStorageService.update(this.key, this.image, fileList.item(0))
      .subscribe(url => {
        this.image.url = url;
        this.imageAlt = 'image';
      });
  }

  public cancel() {
    this.imagesStorageService.update(this.key, this.image)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }

  public delete() {
    this.imagesStorageService.remove(this.key)
      .subscribe(() => {
        this.router.navigate(['/']);
      });
  }
}
