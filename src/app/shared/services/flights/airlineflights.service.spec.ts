import { TestBed, inject } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { FlightService } from './airlineflights.service';

describe('FlightService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [FlightService]
        });
    });
    const mockResponse = {
        data: [
          {
            'tailNumber': 'N902AA',
          'flightNumber': 'AAL311',
          'departureDate': '2019-02-04T00:06:03.000Z',
          'arrivalDate': '2019-02-04T00:50:16.000Z',
          'departureAirport': 'SAT',
          'arrivalAirport': 'DFW',
          'offloadReceived': 'NO'
        }
        ]
    };

    it(
        'should get flights without tail number',
        inject(
            [HttpTestingController, FlightService],
            (httpMock: HttpTestingController, flightService: FlightService) => {
              flightService.getFlightList(1, '2019-11-10T00:00:00Z', '2019-11-10T00:00:00Z', '').subscribe(() => {
                    const mockReq = httpMock.expectOne('http://example.com');

                    expect(mockReq.cancelled).toBeFalsy();
                    expect(mockReq.request.responseType).toEqual('json');
                    mockReq.flush(mockResponse);

                    httpMock.verify();
                });
            }
        )
    );

    it(
      'should get flights with tail number',
      inject(
          [HttpTestingController, FlightService],
          (httpMock: HttpTestingController, flightService: FlightService) => {
            flightService.getFlightList(1, '2019-11-10T00:00:00Z', '2019-11-10T00:00:00Z', 'N101NN').subscribe(() => {
                  const mockReq = httpMock.expectOne('http://example.com');

                  expect(mockReq.cancelled).toBeFalsy();
                  expect(mockReq.request.responseType).toEqual('json');
                  mockReq.flush(mockResponse);

                  httpMock.verify();
              });
          }
      )
  );


  it(
    'should get flights with tail number',
    inject(
        [HttpTestingController, FlightService],
        (httpMock: HttpTestingController, flightService: FlightService) => {
          flightService.getFlightDetails('aal', 'N101NN').subscribe(() => {
                const mockReq = httpMock.expectOne('http://example.com');

                expect(mockReq.cancelled).toBeFalsy();
                expect(mockReq.request.responseType).toEqual('json');
                mockReq.flush(mockResponse);

                httpMock.verify();
            });
        }
    )
);

it(
    'should get flights with tail number',
    inject(
        [HttpTestingController, FlightService],
        (httpMock: HttpTestingController, flightService: FlightService) => {
          flightService.updateFlightDetails('aal', 'N101NN', {id: 1, tailNumber: 'aal'}).subscribe(() => {
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

