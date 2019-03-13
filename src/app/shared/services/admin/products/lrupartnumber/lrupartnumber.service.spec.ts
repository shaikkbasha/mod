import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { LruPartNumberService } from './lrupartnumber.service'; 

describe('LruPartNumberService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LruPartNumberService],
    });
  });

  const mockResponse = {
    data: [
      {
        'partNumber': 'DSA-Part Number1',
        'lruNameId': 57,
        'createdAt': '2019-01-22 13:33:27',
        'updatedAt': '2019-01-24 12:20:38'
      }
    ]
  };
  it('should get lrupart names',  inject(
    [HttpTestingController, LruPartNumberService],
    (httpMock: HttpTestingController, lruPartNumberService: LruPartNumberService) => {
      lruPartNumberService.getLRUPartNumberList().subscribe((data: any) => {
      expect(data.partNumber).toBe('DSA-Part Number1');
    });



  }));
  it(
    'should post the  lru part names',
    inject(
      [HttpTestingController, LruPartNumberService],
      (httpMock: HttpTestingController, lruPartNumberService: LruPartNumberService) => {
        lruPartNumberService.createLRUPartNumber(mockResponse).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'partNumber': 'DSA-Part Number1',
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should update the  lru names',
    inject(
      [HttpTestingController, LruPartNumberService],
      (httpMock: HttpTestingController, lruPartNumberService: LruPartNumberService) => {
        lruPartNumberService.updateLRUPartNumber(mockResponse).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'partNumber': 'DSA-Part Number1',
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should delete the  lru name',
    inject(
      [HttpTestingController, LruPartNumberService],
      (httpMock: HttpTestingController, lruPartNumberService: LruPartNumberService) => {
        lruPartNumberService.deleteLRUPartNumber(1).subscribe( () => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        httpMock.verify();
        });
      }
    )
  );

});



