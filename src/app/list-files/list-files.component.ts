import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FilesStorageService } from '../files-storage.service';
import { FileUpload, FileUploadWithKey } from '../edit-file/fileupload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {
  public files: Observable<FileUploadWithKey[]>;
  
  constructor(
    private imagesService: FilesStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.files = this.imagesService.list();
  }

  addImage() {
    const image: FileUpload = {
      title: 'A test image',
      filename: '',
      url: '',
    };
    this.imagesService.add(image).subscribe(key => this.router.navigate(['/images/' + key]));
  }
}
