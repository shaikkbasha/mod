import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterModule, RouterOutlet, Router, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('AdminComponent', () => {
  let component: AdminComponent;
  let fixture: ComponentFixture<AdminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AdminComponent],
      imports: [
        RouterModule,
        RouterTestingModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('isActive method should be defined', () => {
    component.isActive(['admin', 'stations']);
    expect(component.isActive).toBeDefined();
  });

});
