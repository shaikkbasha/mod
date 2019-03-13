import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { PartNumberService } from './partnumber.service';

describe('PartNumberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PartNumberService],
    });
  });
  const mockResponse = {
    data: [
      {
        'partNumber': 'DSA-Part Number1',
        'lruNameId': 57,
        'createdAt': '2019-01-22 13:33:27',
        'updatedAt': '2019-01-24 12:30:58'
      }
    ]
  };
  it('should get partNumbers',  inject(
    [HttpTestingController, PartNumberService],
    (httpMock: HttpTestingController, partNumberService: PartNumberService) => {
      partNumberService.getPartNumberlist().subscribe((data: any) => {
      expect(data.partNumber).toBe('DSA-Part Number1');
    });



  }));
  it(
    'should post partNumbers',
    inject(
      [HttpTestingController, PartNumberService],
      (httpMock: HttpTestingController, partNumberService: PartNumberService) => {
        partNumberService.createPartNumber(mockResponse).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'partNumber': 'DSA-Part Number1'
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should update the  partNumbers',
    inject(
      [HttpTestingController, PartNumberService],
      (httpMock: HttpTestingController, partNumberService: PartNumberService) => {
        partNumberService.updatePartNumber(mockResponse).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'partNumber': 'DSA-Part Number1'
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should delete the partNumbers',
    inject(
      [HttpTestingController, PartNumberService],
      (httpMock: HttpTestingController, partNumberService: PartNumberService) => {
        partNumberService.deletePartNumber(1).subscribe( () => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        httpMock.verify();
        });
      }
    )
  );

});



