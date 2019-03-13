import { TestBed, inject } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { CoverageService } from './airlinecoverage.service';

describe('CoverageService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [CoverageService]
        });
    });
    const mockResponse = {
        data: [
            {
                'tail': 'N101NN',
                'offloads': 0,
                'flights': 1,
                'percentage': 0.0,
                'dateCount': {
                    '2019-02-04': '0/1',
                    '2019-02-05': '0/0',
                    '2019-02-06': '0/0',
                    '2019-02-07': '0/0'
                }
            }
        ]
    };

    it(
        'should get coverages',
        inject(
            [HttpTestingController, CoverageService],
            (httpMock: HttpTestingController, coverageService: CoverageService) => {
                coverageService.getCoverageList(1, '2019-11-10T00:00:00Z', '2019-11-10T00:00:00Z').subscribe(() => {
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

