import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ArtefactModule } from '../../../shared/artefact.module';
import { RepairReportComponent } from './repair-report.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
describe('RepairReportComponent', () => {
  let component: RepairReportComponent;
  let fixture: ComponentFixture<RepairReportComponent>;
  const activatedRoute = {
    parent: {
      params: Observable.of({
        airlineIcao: 'qal',
        flightId: 'abcd123'
      })
    }
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RepairReportComponent ],
      providers: [{
        provide: ActivatedRoute, useValue: activatedRoute
      }],
      imports: [
        ArtefactModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot()
      ],
   })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RepairReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
