import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { ReasonofremovalService } from './reasonofremoval.service';

describe('ReasonofremovalService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ReasonofremovalService],
    });
  });

  const mockResponse = {
    data: [
      {'id': 85,
      'description': '11',
      'lruTypeId': 3,
      'allPN': false,
      'createdAt': '2019-02-01 05:22:24',
      'updatedAt': '2019-02-01 05:22:24',
      'partNumbersList': [
        {'id': 1,
        'partNumber': '180717',
        'lruNameId': 1,
        'createdAt': '2019-01-04 09:12:45',
        'updatedAt': '2019-01-22 10:53:05'}]}
    ]
  };
  // it('should get all reason of removals',  inject(
  //   [HttpTestingController, ReasonofremovalService],
  //   (httpMock: HttpTestingController, service: ReasonofremovalService) => {
  //     service.getAllReasonOFRemoval().subscribe((data: any) => {
  //     expect(data.description).toBe('11');
  //   });

  //   const req = httpMock.expectOne(URL, URL);
  //   expect(req.request.method).toBe('GET');
  //   req.flush({
  //     'description': '11'
  // });


  it('should get reason of removals',  inject(
    [HttpTestingController, ReasonofremovalService],
    (httpMock: HttpTestingController, service: ReasonofremovalService) => {
      service.getReasonOFRemoval(1).subscribe((data: any) => {
      expect(data.description).toBe('11');
    });


  }));

  it(
    'should post the reason of removals',
    inject(
      [HttpTestingController, ReasonofremovalService],
      (httpMock: HttpTestingController, service: ReasonofremovalService) => {
        service.createRemovals(mockResponse).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'description': '11'
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should update the  reason of removals',
    inject(
      [HttpTestingController, ReasonofremovalService],
      (httpMock: HttpTestingController, service: ReasonofremovalService) => {
        service.updateRemovals(mockResponse, 1).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'description': '11'
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should delete the  reason of removals',
    inject(
      [HttpTestingController, ReasonofremovalService],
      (httpMock: HttpTestingController, service: ReasonofremovalService) => {
        service.deleteRemovals(1).subscribe( () => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        httpMock.verify();
        });
      }
    )
  );

  xit('should get lru types',  inject(
    [HttpTestingController, ReasonofremovalService],
    (httpMock: HttpTestingController, service: ReasonofremovalService) => {
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
    [HttpTestingController, ReasonofremovalService],
    (httpMock: HttpTestingController, service: ReasonofremovalService) => {
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



