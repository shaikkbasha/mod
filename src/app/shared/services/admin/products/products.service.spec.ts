import { TestBed, inject } from '@angular/core/testing';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import {
  HttpClientTestingModule,
  HttpTestingController
} from '@angular/common/http/testing';

describe('ProductsService', () => {
  // let productsService: ProductsService;
  const mockResponse = [
    {
      category: 'test',
      createdAt: '2019-01-08 12:07:25',
      lruNames: [],
      name: 'ABC',
      updatedAt: '2019-01-08 12:07:25'
    }
  ];
  beforeEach(() => TestBed.configureTestingModule({
    imports: [HttpClientModule, HttpClientTestingModule],
    providers: [
      HttpClientModule,
      ProductsService
    ]
  }));

  it(
    'should get flights without tail number',
    inject(
        [HttpTestingController, ProductsService],
        (httpMock: HttpTestingController, productsService: ProductsService) => {

          productsService.getTreeList().subscribe(() => {
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
