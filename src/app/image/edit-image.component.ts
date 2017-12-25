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
      return this.imagesStorageService.get(this.key);
    }).subscribe(image => {
      this.title = image.title;
      this.imagesStorageService.getUrl(this.key).subscribe(url => {
        this.imageUrl = url;
      });
    });
  }

  handleFiles(fileList: FileList) {
    if (fileList.length < 0) {
      return;
    }
    const image: Image = {
      title: this.title,
      filename: fileList.item(0).name,
    };
    this.imagesStorageService.update(this.key, image, fileList.item(0))
      .flatMap(key => this.imagesStorageService.getUrl(key))
      .subscribe(url => {
        this.imageUrl = url;
        this.imageAlt = 'image';
      });
  }

  cancel() {
    this.router.navigate(['/']);
  }
}
