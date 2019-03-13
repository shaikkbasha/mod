import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { MaintenancestationService } from './maintenancestation.service';

describe('MaintenancestationService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [MaintenancestationService],
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
  it('should get maintenance station list',  inject(
    [HttpTestingController, MaintenancestationService],
    (httpMock: HttpTestingController, maintenancestationService: MaintenancestationService) => {
      maintenancestationService.getMaintenanceStationlist().subscribe((data: any) => {
      expect(data.fullName).toBe('Station 1');
    });

  }));
  it(
    'should post maintenance station',
    inject(
      [HttpTestingController, MaintenancestationService],
      (httpMock: HttpTestingController, maintenancestationService: MaintenancestationService) => {
        maintenancestationService.createMaintenanceStations(mockResponse).subscribe(() => {
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
    'should update the  maintenace station',
    inject(
      [HttpTestingController, MaintenancestationService],
      (httpMock: HttpTestingController, maintenancestationService: MaintenancestationService) => {
        maintenancestationService.updateMaintenanceStations(mockResponse).subscribe(() => {
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
    'should delete the maintenance station',
    inject(
      [HttpTestingController, MaintenancestationService],
      (httpMock: HttpTestingController, maintenancestationService: MaintenancestationService) => {
        maintenancestationService.deleteMaintenanceStations(1).subscribe( () => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        httpMock.verify();
        });
      }
    )
  );
});



