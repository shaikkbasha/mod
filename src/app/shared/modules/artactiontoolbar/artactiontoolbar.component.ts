import {
  Component,
  OnInit,
  EventEmitter,
  Output,
  Input,
  OnChanges,
  SimpleChanges,
  HostListener,
  ElementRef,
  ViewChild
} from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState } from '@angular/cdk/layout';
@Component({
  selector: 'art-action-toolbar',
  templateUrl: './artactiontoolbar.component.html'
})
export class ArtActionToolBarComponent implements OnInit, OnChanges {
  enableSearchToolBar = false;
  listSearch: any = null;
  actionToolbarObj: any = {
    enableSearch: false
  };
  color = '';
  @Input() config: any = {};
  @Output() getSearchText = new EventEmitter<any>();
  @Output() actionToolBarEvent = new EventEmitter();
  @Input() getSelectedRow: any = [];
  @ViewChild('searchBox') searchBox: ElementRef;
  constructor(private _eref: ElementRef, breakpointObserver: BreakpointObserver) {
    breakpointObserver.observe(['(max-width: 414px)']).subscribe(result => {
      this.enableSearchToolBar = false;
    });
  }
  @HostListener('blur', ['$event.target']) onBlur(target) {
    this.enableSearchToolBar = false;
  }
  ngOnInit() {
  }

  searchLists() {
    this.getSearchText.emit(this.listSearch);
  }

  ngOnChanges(): void {
    if (this.getSelectedRow) {
      this.enableSearchToolBar = false;
      this.listSearch = null;
    }
  }
  toolBarEventClick(eveName, moduleName) {
    const obj = {
      eventName: eveName,
      moduleName: moduleName
    };
    this.actionToolBarEvent.emit(obj);
  }
  enableSearch() {
    // this.listSearch = null;
    if  (!this.getSelectedRow.length) {
      this.enableSearchToolBar = true;
    }
    setTimeout(() => this.searchBox.nativeElement.focus());
  }
}
