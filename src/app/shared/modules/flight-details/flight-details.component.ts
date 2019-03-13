import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'art-flight-details',
  templateUrl: './flight-details.component.html',
  styleUrls: ['./flight-details.component.css']
})
export class FlightDetailsComponent implements OnInit {

  @Input() componentId: string;
  @Input() colClass: string;
  @Input() flightDetails: any;
  constructor() { }

  ngOnInit() {
  }

}
