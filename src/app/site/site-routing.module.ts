import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostsComponent } from './posts/posts.component';
import { StaticpageComponent } from './staticpage/staticpage.component';
import { ReleasesComponent } from './releases/releases.component';
import { ReleaseComponent } from './release/release.component';
import { SiteComponent } from './site/site.component';

const routes: Routes = [
  {
    path: '',
    component: SiteComponent,
    children: [
      { path: '', redirectTo: 'posts' },
      { path: 'posts', component: PostsComponent },
      { path: 'prinzipien', component: StaticpageComponent },
      { path: 'releases', component: ReleasesComponent },
      { path: 'releases/:id', component: ReleaseComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SiteRoutingModule { }
