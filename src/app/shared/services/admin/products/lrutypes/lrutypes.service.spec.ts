import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

import { LruTypeService } from './lrutypes.service';

describe('LruTypeService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [LruTypeService],
    });
  });

  const mockResponse = {
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
  it('should get lru types',  inject(
    [HttpTestingController, LruTypeService],
    (httpMock: HttpTestingController, lruTypeService: LruTypeService) => {
      lruTypeService.getLRUTypeslist().subscribe((data: any) => {
      expect(data.name).toBe('DSA1');
    });



  }));
  it(
    'should post the  lru types',
    inject(
      [HttpTestingController, LruTypeService],
      (httpMock: HttpTestingController, lruTypeService: LruTypeService) => {
        lruTypeService.createLRUTypes(mockResponse).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'name': 'DSA1'
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should update the  lru types',
    inject(
      [HttpTestingController, LruTypeService],
      (httpMock: HttpTestingController, lruTypeService: LruTypeService) => {
        lruTypeService.updateLRUTypes(mockResponse).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        mockReq.flush({
          'name': 'DSA1'
      });

        httpMock.verify();
        });
      }
    )
  );

  it(
    'should delete the  lru types',
    inject(
      [HttpTestingController, LruTypeService],
      (httpMock: HttpTestingController, lruTypeService: LruTypeService) => {
        lruTypeService.deleteLRUTypes(1).subscribe( () => {
          const mockReq = httpMock.expectOne('http://example.com');

        expect(mockReq.cancelled).toBeFalsy();
        expect(mockReq.request.responseType).toEqual('json');
        httpMock.verify();
        });
      }
    )
  );

});



