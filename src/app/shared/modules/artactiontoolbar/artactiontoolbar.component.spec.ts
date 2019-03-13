import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';

import { ArtActionToolBarComponent } from './artactiontoolbar.component';

describe('ArtActionToolbarComponent', () => {
  let component: ArtActionToolBarComponent;
  let fixture: ComponentFixture<ArtActionToolBarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        FormsModule
      ],
      declarations: [ArtActionToolBarComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArtActionToolBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('searchLists should be defined', () => {
    component.searchLists();
    expect(component.searchLists).toBeDefined();
  });
  it('toolBarEventClick should be defined', () => {
    component.toolBarEventClick('create', '');
    expect(component.toolBarEventClick).toBeDefined();
  });
  it('toolBarEventClick should be defined', () => {
    component.getSelectedRow = [];
    component.ngOnChanges();
    expect(component.enableSearchToolBar).toBeFalsy();
    expect(component.ngOnChanges).toBeDefined();
  });
  it('enable Search', () => {
    setTimeout(() => {
      component.searchBox = {nativeElement: { focus: function() {}}};
    });
    component.enableSearch();
    expect(component.enableSearch).toBeDefined();
  });
}
);
