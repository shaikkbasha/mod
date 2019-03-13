import { AppModule } from './app.module';
import { TestBed, ComponentFixture, async, inject, fakeAsync } from '@angular/core/testing';
import {} from 'jasmine';

describe('AppModule', () => {
  let appModule: AppModule;

  beforeEach(() => {
    appModule = new AppModule();
  });

  it('should create an instance', () => {
    expect(appModule).toBeTruthy();
  });
});
