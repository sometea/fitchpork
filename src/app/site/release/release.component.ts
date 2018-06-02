import { Component, OnInit } from '@angular/core';
import { ArticlesService } from '../../articles.service';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Article } from '../../admin/edit-article/article';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.css']
})
export class ReleaseComponent implements OnInit {
  public key: string;
  public release: Article;

  constructor(
    private articlesService: ArticlesService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.paramMap.switchMap((params: ParamMap) => {
      this.key = params.get('id');
      return this.articlesService.get(this.key);
    }).subscribe(release => {
      this.release = release;
    });
  }

}
