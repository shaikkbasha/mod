import { TestBed, inject } from '@angular/core/testing';
import {
    HttpClientTestingModule,
    HttpTestingController
} from '@angular/common/http/testing';

import { AirlineTailService } from './airlinetails.service';

describe('AirlineTailService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [AirlineTailService]
        });
    });
    const mockResponse = {
        data: [
          {'id': 176,
          'repairTailName': '31214',
          'noseNumber':  '3MJ',
          'msn': 31214,
          'type': 'B737',
          'airlineId': 8,
          'databaseName': 'AAL_N967NN',
          'platform': 'AVANT',
          'software': 'v2.2.1',
          'systemResetStatus': 0,
          'headEndStatus': 0,
          'firstClassStatus': -1,
          'businessClassStatus': -1,
          'economyClassStatus': -1,
          'connectivityStatus': -1,
          'status': 0,
          'isp': null,
          'acConfiguration': 'B737',
          'eis': '2015-03-12',
          'configStatus': '',
          'lfrf': '',
          'swPartNo': '',
          'swBaseline': 'PI4',
          'swInstalled': '2017-04-02',
          'mapVersion': '',
          'content': '',
          'createdAt': null,
          'updatedAt': null,
          'tailNumber': 'N967NN'
        }
        ]
    };

    it(
        'should get tail list',
        inject(
            [HttpTestingController, AirlineTailService],
            (httpMock: HttpTestingController, service: AirlineTailService) => {
              service.getAircraftlist(1).subscribe(() => {
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

