import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { FilesStorageService } from '../files-storage.service';
import { FileUpload, FileUploadWithKey, FileType } from '../edit-file/fileupload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-files',
  templateUrl: './list-files.component.html',
  styleUrls: ['./list-files.component.css']
})
export class ListFilesComponent implements OnInit {
  public files: Observable<FileUploadWithKey[]>;

  constructor(
    private filesService: FilesStorageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.files = this.filesService.list();
  }

  addFile() {
    const file: FileUpload = {
      title: 'A test file',
      filename: '',
      url: '',
      type: FileType.File
    };
    this.filesService.add(file).subscribe(key => this.router.navigate(['/files/' + key]));
  }
}
