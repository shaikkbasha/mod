import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'art-label-value',
  templateUrl: 'label-component.html',
  styleUrls: ['./label-value.component.css']
})
export class LabelValueComponent implements OnInit {

  constructor() { }
  @Input() label;
  @Input() value;
  @Input() format;
  @Input() id;
  ngOnInit() {
  }

}
