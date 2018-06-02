import { Component, OnInit, Input } from '@angular/core';
import { FilesStorageService } from '../../files-storage.service';
import { UploadProgress } from '../../upload-progress';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { FileUpload, FileType } from './fileupload';

@Component({
  selector: 'app-edit-file',
  templateUrl: './edit-file.component.html',
  styleUrls: ['./edit-file.component.css']
})
export class EditFileComponent implements OnInit {
  private key: string;
  public imageAlt: string;
  public file: FileUpload;
  public uploadPercent: Number;

  constructor(
    private filesStorageService: FilesStorageService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.imageAlt = 'No image loaded yet!';
    this.file = new FileUpload();
    this.uploadPercent = 0;
  }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      this.key = params.get('id');
      return this.filesStorageService.get(this.key);
    }).subscribe(image => {
      this.file = image;
    });
  }

  public handleFiles(fileList: FileList) {
    if (fileList.length < 0) {
      return;
    }
    this.file.filename = fileList.item(0).name;
    this.filesStorageService.update(this.key, this.file, fileList.item(0))
      .subscribe((uploadProgress: UploadProgress) => {
        if (uploadProgress.downloadUrl) {
          this.file.url = uploadProgress.downloadUrl;
          this.imageAlt = 'image';
        }
        this.uploadPercent = uploadProgress.percentCompleted;
      });
  }

  public cancel() {
    this.router.navigate(['/admin/files']);
  }

  public submit() {
    this.filesStorageService.update(this.key, this.file)
      .subscribe(() => {
        this.router.navigate(['/admin/files']);
      });
  }

  public delete() {
    this.filesStorageService.remove(this.key)
      .subscribe(() => {
        this.router.navigate(['/admin/files']);
      });
  }

  public showImage() {
    return this.file && this.file.type === FileType.Image;
  }
}
