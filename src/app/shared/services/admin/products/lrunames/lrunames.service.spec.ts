import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { LruNameService } from './lrunames.service';

describe('LruNameService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LruNameService]
    });
  });
  const mockResponse = {
    data: [
      {
        'name': 'DSU-D3',
        'lruTypeId': 1,
        'createdAt': '2019-01-07 06:25:55',
        'updatedAt': '2019-01-24 12:13:29'
      }
    ]
  };
  it(
    'should get lrunames',
    inject(
      [HttpTestingController, LruNameService],
      (httpMock: HttpTestingController, lruNameService: LruNameService) => {


        lruNameService.getLRUNamelist().subscribe(() => {
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
    'should post the  lrunames',
    inject(
      [HttpTestingController, LruNameService],
      (httpMock: HttpTestingController, lruNameService: LruNameService) => {

        lruNameService.createLRUName(mockResponse).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'name': 'DSU-D3'
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should update the  lru names',
    inject(
      [HttpTestingController, LruNameService],
      (httpMock: HttpTestingController, lruNameService: LruNameService) => {
        lruNameService.updateLRUName(mockResponse).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'name': 'DSU-D3'
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should delete the  lru name',
    inject(
      [HttpTestingController, LruNameService],
      (httpMock: HttpTestingController, dataService: LruNameService) => {
        dataService.deleteLRUName(1).subscribe( () => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        httpMock.verify();
        });
      }
    )
  );

});

