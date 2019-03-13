import { TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { of } from 'rxjs/observable/of';
import { TvPerformanceDataService } from './tv-performance-data.service';

describe('TvPerformanceDataService', () => {

  let tvDataService: TvPerformanceDataService;
  let flightDetails;
  let subject;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TvPerformanceDataService]
    });

    tvDataService = TestBed.get(TvPerformanceDataService);

    flightDetails = {
      airlineIcao:  '',
      flightId:  ''
    };
    subject = new BehaviorSubject(flightDetails);
  });

  it('should be created', () => {
    expect(tvDataService).toBeTruthy();
  });

  it('should update and return data', () => {
    flightDetails = {
      airlineIcao:  'aal',
      flightId:  '5c011a1e53b7fd001fec504a'
    };
    let resp;
    tvDataService.flightDetails = flightDetails;
    tvDataService.getData().subscribe(response => {
      resp = response;
    });
    tvDataService.sendData(flightDetails);
    expect(resp).toEqual(flightDetails);
  });
  it('should clear data', () => {
    let resp;
    tvDataService.flightDetails = flightDetails;
    tvDataService.getData().subscribe(response => {
      resp = response;
    });
    tvDataService.clearData();
    expect(resp).toEqual(flightDetails);
  });

});
