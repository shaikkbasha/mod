import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, RouterOutlet, Router, Routes } from '@angular/router';
import { RepairComponent } from './repair.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('RepairComponent', () => {
  let component: RepairComponent;
  let fixture: ComponentFixture<RepairComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairComponent ],
      imports: [
        RouterModule,
        RouterTestingModule
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('isActive method should be defined', () => {
    component.isActive(['repair', 'repairs']);
    expect(component.isActive).toBeDefined();
  });

});
