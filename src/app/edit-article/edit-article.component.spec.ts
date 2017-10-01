import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { EditArticleComponent } from './edit-article.component';
import { AuthenticationService } from "../authentication.service";
import { Observable } from "rxjs/Observable";
import { Article } from "./article";
import { FormsModule } from "@angular/forms";

describe('EditArticleComponent', () => {
  let component: EditArticleComponent;
  let fixture: ComponentFixture<EditArticleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [ EditArticleComponent ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditArticleComponent);
    component = fixture.componentInstance;
    component.article = new Article()
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
