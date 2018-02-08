import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../articles.service';
import { Article } from "../edit-article/article";
import { AuthenticationService } from '../authentication.service';
import { Observable } from 'rxjs';
import { ImagesStorageService } from '../images-storage.service';
import { Image } from '../image/image';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  
  constructor(
    private articlesService: ArticlesService,
    private imagesService: ImagesStorageService,
    private authenticationService: AuthenticationService,
    private router: Router,
  ) { }

  ngOnInit() {
  }

  removeArticle(key: string) {
    this.articlesService.remove(key);
  }

  addArticle() {
    const article: Article = {
      title: 'A new article',
      text: 'This article has just been created',
      date: 'Today',
    };
    this.articlesService.add(article).subscribe(key => this.router.navigate(['/articles/' + key]));
  }

  addImage() {
    const image: Image = {
      title: 'A test image',
      filename: '',
      url: '',
    };
    this.imagesService.add(image).subscribe(key => this.router.navigate(['/images/' + key]));
  }
}
