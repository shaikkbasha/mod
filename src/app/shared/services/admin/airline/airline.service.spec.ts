import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { AirlineService } from './airline.service';

describe('AirlineService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AirlineService]
    });
  });
  const mockResponse = {
    data: [
      {
        'id': 1, 'name': 'Qatar', 'acronym': 'QTR', 'status': 1, 'icao': 'QTR',
        'iata': 'AA',
        'createdAt': '2019-01-30 18:12:49', 'updatedAt': '2019-01-30 18:12:51'
      }
    ]
  };

  it(
    'should get airlines',
    inject(
      [HttpTestingController, AirlineService],
      (httpMock: HttpTestingController, airlineService: AirlineService) => {
        airlineService.getAirlines().subscribe(() => {
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
    'should post the  airline',
    inject(
      [HttpTestingController, AirlineService],
      (httpMock: HttpTestingController, airlineService: AirlineService) => {
        airlineService.create(mockResponse).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'name': 'Qatar'
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should update the  airline',
    inject(
      [HttpTestingController, AirlineService],
      (httpMock: HttpTestingController, airlineService: AirlineService) => {
        airlineService.update(mockResponse).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'name': 'Qatar'
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should delete the  airline',
    inject(
      [HttpTestingController, AirlineService],
      (httpMock: HttpTestingController, dataService: AirlineService) => {
        dataService.delete(1).subscribe( () => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        httpMock.verify();
        });
      }
    )
  );

  it(
    'should get user airlines',
    inject(
      [HttpTestingController, AirlineService],
      (httpMock: HttpTestingController, airlineService: AirlineService) => {
        airlineService.getAirlineForUser().subscribe(() => {
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
    'should get airline by Icao',
    inject(
      [HttpTestingController, AirlineService],
      (httpMock: HttpTestingController, airlineService: AirlineService) => {
        airlineService.getAirlineByIcao('AAL').subscribe(() => {
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

