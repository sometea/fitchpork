import { Component, OnInit, Input } from '@angular/core';
import { FilesStorageService } from '../files-storage.service';
import { UploadProgress } from '../upload-progress';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FileUpload } from './image';

@Component({
  selector: 'app-edit-image',
  templateUrl: './edit-image.component.html',
  styleUrls: ['./edit-image.component.css']
})
export class EditImageComponent implements OnInit {
  private key: string;
  public imageAlt: string;
  public image: FileUpload;
  public uploadPercent: Number;

  constructor(
    private imagesStorageService: FilesStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.imageAlt = 'No image loaded yet!';
    this.image = new FileUpload();
    this.uploadPercent = 0;
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
      .subscribe((uploadProgress: UploadProgress) => {
        if (uploadProgress.downloadUrl) {
          this.image.url = uploadProgress.downloadUrl;
          this.imageAlt = 'image';
        }
        this.uploadPercent = uploadProgress.percentCompleted;
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
