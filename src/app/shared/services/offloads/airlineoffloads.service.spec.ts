import { TestBed, inject } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { OffloadService } from './airlineoffloads.service';

describe('OffloadService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [OffloadService]
        });
    });
    const mockResponse = {
        data: [
          {'id': 8944,
          'airlineId': 8,
          'fileName': 'TVPERF_20190820002652_AAL_N344PP_701.tgz',
          'fileSize': 112695,
          'offloadDate': null,
          'status': 'Processed',
          'flightNumber': null,
          'uploadedTime': '2019-01-22T13:50:01.000Z',
          'failureReason': null,
          'remarks': 'File processed successfully',
          'flightLegIds': null,
          'source': 'Manual',
          'tailNumberInFile': null,
          'tailNumber': null,
          'flightLegStartTime': null,
          'flightLegEndTime': null,
          'departureAirport': null,
          'arrivalAirport': null,
          'oppFileFound': false,
          'tailNumberSource': null
        }
        ]
    };

    it(
        'should get offloads',
        inject(
            [HttpTestingController, OffloadService],
            (httpMock: HttpTestingController, offloadService: OffloadService) => {
              offloadService.getOffloadList(1, '2019-11-10T00:00:00Z', '2019-11-10T00:00:00Z').subscribe(() => {
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

