import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListingPage } from './movie-listing.page';

describe('MovieListingPage', () => {
  let component: MovieListingPage;
  let fixture: ComponentFixture<MovieListingPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieListingPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieListingPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
