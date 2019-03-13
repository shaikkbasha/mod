import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'art-section-title',
  templateUrl: './section-title.component.html',
  styleUrls: ['./section-title.component.css']
})
export class SectionTitleComponent implements OnInit {

  @Input() sectionTitle: string;
  constructor() { }

  ngOnInit() {
  }

}
