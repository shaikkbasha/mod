import { Component, Input } from '@angular/core';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-idle-modal',
  templateUrl: './idle-modal.component.html'
})
export class IdleModalComponent {
  @Input() countdown;

  constructor(public activeModal: NgbActiveModal) {}
}
