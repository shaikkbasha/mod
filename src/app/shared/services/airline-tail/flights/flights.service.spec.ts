import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';
import { FlightsService } from './flights.service';
import { Observable, of } from 'rxjs';
describe('FlightsService', () => {
  const mockResponse = [
    {
        'id': '1234',
        'flightNumber': '28',
        'departureAirport': 'LAX',
        'arrivalAirport': 'JFK',
        'startTime': '2019-01-14T21:32:15Z',
        'endTime': '2019-01-15T04:52:39Z'
    },
    {
        'id': '1234',
        'flightNumber': '29',
        'departureAirport': 'LAX',
        'arrivalAirport': 'JFK',
        'startTime': '2019-01-14T21:32:15Z',
        'endTime': '2019-01-15T04:52:39Z'
    }
  ];

  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [FlightsService]
  }));

  it('should be created', () => {
    const service: FlightsService = TestBed.get(FlightsService);
    expect(service).toBeTruthy();
  });

  it(
    'should get flights without tail number',
    inject(
        [HttpTestingController, FlightsService],
        (httpMock: HttpTestingController, flightsService: FlightsService) => {
          const dateObj = {
            fromDate: '2019-02-08T00:00:00Z',
            toDate: '2019-02-10T23:59:59Z'
          };
          flightsService.getFlights('aal', '11', dateObj).subscribe(() => {
                const mockReq = httpMock.expectOne('http://example.com');

                expect(mockReq.cancelled).toBeFalsy();
                expect(mockReq.request.responseType).toEqual('json');
                mockReq.flush(mockResponse);

                httpMock.verify();
            });
        }
    )
);

});
