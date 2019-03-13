import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { RepairActionService } from './repairaction.service';

describe('RepairActionService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [RepairActionService],
    });
  });

  const mockResponse = {
    data: [
      {'id': 14,
      'description': '123',
      'lruTypeId': 3,
      'allPN': false,
      'createdAt': '2019-02-01 09:42:08',
      'updatedAt': '2019-02-01 11:56:52',
      'partNumbersList':
      [{'id': 1,
      'partNumber': '180717',
      'lruNameId': 1,
      'createdAt': '2019-01-04 09:12:45',
      'updatedAt': '2019-01-22 10:53:05'}]}
    ]
  };
  it('should get repair actions',  inject(
    [HttpTestingController, RepairActionService],
    (httpMock: HttpTestingController, repariService: RepairActionService) => {
      repariService.getRepairActionList(1).subscribe((data: any) => {
      expect(data.description).toBe('123');
    });

  }));
  it(
    'should post repair action',
    inject(
      [HttpTestingController, RepairActionService],
      (httpMock: HttpTestingController, repariService: RepairActionService) => {
        repariService.createRepairAction(mockResponse).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'description': '123'
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should update the  repair action',
    inject(
      [HttpTestingController, RepairActionService],
      (httpMock: HttpTestingController, repariService: RepairActionService) => {
        repariService.updateRepairAction(mockResponse, 1).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'description': '123'
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should delete the repair action',
    inject(
      [HttpTestingController, RepairActionService],
      (httpMock: HttpTestingController, repariService: RepairActionService) => {
        repariService.deleteRepairAction(1).subscribe( () => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        httpMock.verify();
        });
      }
    )
  );

  xit('should get lru types',  inject(
    [HttpTestingController, RepairActionService],
    (httpMock: HttpTestingController, service: RepairActionService) => {
      const lruTypeResponse = {
        data: [
          {
            'id': 25,
            'name': 'DSA1',
            'category': 'head-end',
            'createdAt': '2019-01-10 13:23:43',
            'updatedAt': '2019-01-24 12:26:13'
          }
        ]
      };
      service.getLRUTypes().subscribe(() => {
        const mockReq = httpMock.expectOne('http://example.com');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({
        'name': 'DSA1'
    });

      httpMock.verify();
      });

  }));

  it('should get part numbers',  inject(
    [HttpTestingController, RepairActionService],
    (httpMock: HttpTestingController, service: RepairActionService) => {
      const partNumberResponse = {
        data: [
          {
            'partNumber': 'DSA-Part Number1',
            'lruNameId': 57,
            'createdAt': '2019-01-22 13:33:27',
            'updatedAt': '2019-01-24 12:30:58'
          }
        ]
      };
      service.getPartNumbers(1).subscribe(() => {
        const mockReq = httpMock.expectOne('http://example.com');

      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({
        'partNumber': 'DSA-Part Number1'
    });

      httpMock.verify();
      });

  }));
});



