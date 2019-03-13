import { TestBed, inject } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { PeriodicTunerStatusService } from './periodic-tuner-status.service';
describe('TunerService', () => {

  const mockResponse = {
    data: [
      {
        'timeStamp': '2019-01-18T05:21:22Z',
        '5-1': 'not_used',
        '5-2': 'not_used',
        '5-3': 'not_used',
        '5-4': 'not_used',
        '5-5': 'not_used',
        '5-6': 'not_used',
        '5-7': 'not_used',
        '5-8': 'not_used',
        '6-1': 'not_used',
        '6-2': 'not_used',
        '6-3': 'not_used',
        '6-4': 'not_used',
        '6-5': 'not_used',
        '6-6': 'not_used',
        '6-7': 'not_used',
        '6-8': 'not_used',
        '7-1': 'not_used',
        '7-2': 'not_used',
        '7-3': 'not_used',
        '7-4': 'not_used',
        '7-5': 'not_used',
        '7-6': 'not_used',
        '7-7': 'not_used',
        '7-8': 'not_used',
        '1-1': 'not_used',
        '1-2': 'not_used',
        '1-3': 'not_used',
        '1-4': 'not_used',
        '1-5': 'not_used',
        '1-6': 'not_used',
        '1-7': 'not_used',
        '1-8': 'not_used',
        '2-1': 'not_used',
        '2-2': 'not_used',
        '2-3': 'not_used',
        '2-4': 'not_used',
        '2-5': 'not_used',
        '2-6': 'not_used',
        '2-7': 'not_used',
        '2-8': 'not_used',
        '3-1': 'not_used',
        '3-2': 'not_used',
        '3-3': 'not_used',
        '3-4': 'not_used',
        '3-5': 'not_used',
        '3-6': 'not_used',
        '3-7': 'not_used',
        '3-8': 'not_used',
        '4-1': 'not_used',
        '4-2': 'not_used',
        '4-3': 'not_used',
        '4-4': 'not_used',
        '4-5': 'not_used',
        '4-6': 'not_used',
        '4-7': 'not_used',
        '4-8': 'not_used'
      },
      {
        'timeStamp': '2019-01-18T05:26:22Z',
        '5-1': 'not_used',
        '5-2': 'not_used',
        '5-3': 'not_used',
        '5-4': 'not_used',
        '5-5': 'not_used',
        '5-6': 'not_used',
        '5-7': 'not_used',
        '5-8': 'not_used',
        '6-1': 'not_used',
        '6-2': 'not_used',
        '6-3': 'not_used',
        '6-4': 'not_used',
        '6-5': 'not_used',
        '6-6': 'not_used',
        '6-7': 'not_used',
        '6-8': 'not_used',
        '7-1': 'not_used',
        '7-2': 'not_used',
        '7-3': 'not_used',
        '7-4': 'not_used',
        '7-5': 'not_used',
        '7-6': 'not_used',
        '7-7': 'not_used',
        '7-8': 'not_used',
        '1-1': 'not_used',
        '1-2': 'not_used',
        '1-3': 'not_used',
        '1-4': 'not_used',
        '1-5': 'not_used',
        '1-6': 'not_used',
        '1-7': 'not_used',
        '1-8': 'not_used',
        '2-1': 'not_used',
        '2-2': 'not_used',
        '2-3': 'not_used',
        '2-4': 'not_used',
        '2-5': 'not_used',
        '2-6': 'not_used',
        '2-7': 'not_used',
        '2-8': 'not_used',
        '3-1': 'not_used',
        '3-2': 'not_used',
        '3-3': 'not_used',
        '3-4': 'not_used',
        '3-5': 'not_used',
        '3-6': 'not_used',
        '3-7': 'not_used',
        '3-8': 'not_used',
        '4-1': 'not_used',
        '4-2': 'not_used',
        '4-3': 'not_used',
        '4-4': 'not_used',
        '4-5': 'not_used',
        '4-6': 'not_used',
        '4-7': 'not_used',
        '4-8': 'not_used'
      }]
  };

  const mockDetailsResponse = {
    data: [{
      'timestamp': '2018-05-23T21:43:48Z',
      'authorized': 'true',
      'paired': 'true',
      'channelId': '0',
      'channelNumber': '0',
      'transponder': '0',
      'cnr': '-1.0',
      'agc': '-127.5'
    }]
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [PeriodicTunerStatusService]
    });
  });

  it('should be created', () => {
    const periodicService = TestBed.get(PeriodicTunerStatusService);
    expect(periodicService).toBeTruthy();
  });

  it(
    'should get periodic tuner data',
    inject(
      [HttpTestingController, PeriodicTunerStatusService],
      (httpMock: HttpTestingController, periodicTunerService: PeriodicTunerStatusService) => {
        const airlineIcao = 'aal';
        const flightId = '5c011a1e53b7fd001fec504a';
        periodicTunerService.getPeriodicTunerData(flightId, airlineIcao).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(mockResponse);
          httpMock.verify();
        });
      })
  );

  it(
    'should get periodic tuner details',
    inject(
      [HttpTestingController, PeriodicTunerStatusService],
      (httpMock: HttpTestingController, periodicTunerService: PeriodicTunerStatusService) => {
        const airlineIcao = 'aal';
        const flightId = '5c011a1e53b7fd001fec504a';
        const filterObj = {
          timeStamp: '2018-05-23T21:43:48Z',
          board: 2,
          tuner: 3,
        };
        periodicTunerService.getPeriodicTunerDetails(flightId, airlineIcao, filterObj).subscribe(() => {
          const mockReq = httpMock.expectOne('http://example.com');
          expect(mockReq.cancelled).toBeFalsy();
          expect(mockReq.request.responseType).toEqual('json');
          mockReq.flush(mockDetailsResponse);
          httpMock.verify();
        });
      })
  );
});
