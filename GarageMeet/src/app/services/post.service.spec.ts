import { TestBed } from '@angular/core/testing';
import { Injectable } from '@angular/core';
import { PostService } from './post.service';





describe('PostService', () => {
  let service: PostService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PostService);
  });

  xit('should be created', () => {
    expect(service).toBeTruthy();
  });
});
