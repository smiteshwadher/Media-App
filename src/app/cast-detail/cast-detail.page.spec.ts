import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CastDetailPage } from './cast-detail.page';

describe('CastDetailPage', () => {
  let component: CastDetailPage;
  let fixture: ComponentFixture<CastDetailPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CastDetailPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CastDetailPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
