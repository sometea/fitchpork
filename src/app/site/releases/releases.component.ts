import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../articles.service';
import { Observable } from 'rxjs/Observable';
import { ArticleWithKey, ArticleType } from '../../admin/edit-article/article';

@Component({
  selector: 'app-releases',
  templateUrl: './releases.component.html',
  styleUrls: ['./releases.component.css']
})
export class ReleasesComponent implements OnInit {
  private releases: Observable<ArticleWithKey[]>;

  constructor(private articlesService: ArticlesService) { }

  ngOnInit() {
    this.releases = this.articlesService.list(ArticleType.Release);
  }

}
