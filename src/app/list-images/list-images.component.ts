import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FilesStorageService } from '../files-storage.service';
import { FileUpload, FileUploadWithKey } from '../image/image';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-images',
  templateUrl: './list-images.component.html',
  styleUrls: ['./list-images.component.css']
})
export class ListImagesComponent implements OnInit {
  public images: Observable<FileUploadWithKey[]>;
  
  constructor(
    private imagesService: FilesStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.images = this.imagesService.list();
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
