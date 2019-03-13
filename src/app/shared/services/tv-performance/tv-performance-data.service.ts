import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class TvPerformanceDataService {

  flightDetails: any = {
    airlineIcao: '',
    flightId: ''
  };

  private subject: BehaviorSubject<any> = new BehaviorSubject<FlightDetails>(this.flightDetails);

  sendData(flight: FlightDetails) {
    this.subject.next(flight);
  }

  clearData() {
    this.subject.next(this.flightDetails);
  }

  getData(): Observable<FlightDetails> {
    return this.subject.asObservable();
  }

}

export interface FlightDetails {
  id: string;
  tailNumber: string;
  flightNumber: string;
  departureTime: string;
  arrivalTime: string;
  departureAirport: string;
  arrivalAirport: string;
  icao: string;
  dateFormat: Object;
}
