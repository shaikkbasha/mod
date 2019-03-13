import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { RepairstationService } from './repairstation.service';

describe('RepairstationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepairstationService],
    });
  });

  const mockResponse = {
    data: [
      {
        id: 1,
        fullName: 'Station 1',
        shortName: 'S1',
        locationName: 'CA'
      }
    ]
  };
  it('should get repair station list',  inject(
    [HttpTestingController, RepairstationService],
    (httpMock: HttpTestingController, service: RepairstationService) => {
      service.getRepairStationslist().subscribe((data: any) => {
      expect(data.fullName).toBe('Station 1');
    });

  }));
  it(
    'should post repair station',
    inject(
      [HttpTestingController, RepairstationService],
      (httpMock: HttpTestingController, service: RepairstationService) => {
        service.createRepairStations(mockResponse).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'fullName': 'Station 1'
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should update the  repair station',
    inject(
      [HttpTestingController, RepairstationService],
      (httpMock: HttpTestingController, service: RepairstationService) => {
        service.updateRepairStation(mockResponse).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'fullName': 'Station 1'
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should delete the repair station',
    inject(
      [HttpTestingController, RepairstationService],
      (httpMock: HttpTestingController, service: RepairstationService) => {
        service.deleteRepairStations(1).subscribe( () => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        httpMock.verify();
        });
      }
    )
  );
});



