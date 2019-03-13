import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtKpiCardComponent } from './art-kpi-card.component';

describe('ArtCardComponent', () => {
  let component: ArtKpiCardComponent;
  let fixture: ComponentFixture<ArtKpiCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArtKpiCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtKpiCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
