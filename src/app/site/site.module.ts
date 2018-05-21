import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SiteRoutingModule } from './site-routing.module';
import { SiteComponent } from './site/site.component';
import { ReleaseComponent } from './release/release.component';
import { ReleasesComponent } from './releases/releases.component';
import { PostsComponent } from './posts/posts.component';
import { StaticpageComponent } from './staticpage/staticpage.component';

@NgModule({
  imports: [
    CommonModule,
    SiteRoutingModule
  ],
  declarations: [
    SiteComponent,
    ReleaseComponent,
    ReleasesComponent,
    PostsComponent,
    StaticpageComponent,
  ]
})
export class SiteModule { }
