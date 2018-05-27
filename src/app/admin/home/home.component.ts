import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../articles.service';
import { Article, ArticleType } from '../edit-article/article';
import { AuthenticationService } from '../../authentication.service';
import { Observable } from 'rxjs/Observable';
import { FilesStorageService } from '../../files-storage.service';
import { FileUpload, FileType } from '../edit-file/fileupload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  constructor(
    private articlesService: ArticlesService,
    private imagesService: FilesStorageService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
  }
}
