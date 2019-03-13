import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable, of } from 'rxjs';

import { ArtfocusedobjectheaderComponent } from './artfocusedobjectheader.component';

describe('ArtfocusedobjectheaderComponent', () => {
  let component: ArtfocusedobjectheaderComponent;
  let fixture: ComponentFixture<ArtfocusedobjectheaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [ ArtfocusedobjectheaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtfocusedobjectheaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('isDropdownItemActive should create', () => {
    component.isDropdownItemActive([]);
    expect(component.isDropdownItemActive([])).toBeDefined();
  });
  it('should defined isActive event', () => {
    component.isActive([]);
    expect(component.isActive).toBeDefined();
  });
});
