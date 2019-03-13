import { environment } from '../../../../environments/environment';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TvPerformanceFlightsService } from './tv-performance-flights.service';

describe('TvPerformanceFlightsService', () => {
  let tvPerformanceService: TvPerformanceFlightsService;
  let httpMock: HttpTestingController;
  beforeEach(() => TestBed.configureTestingModule({}));

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TvPerformanceFlightsService ]
    });
    tvPerformanceService = TestBed.get(TvPerformanceFlightsService);
    httpMock = TestBed.get(HttpTestingController);
  });
  it('should be created', () => {
    expect(tvPerformanceService).toBeTruthy();
  });
  it('should get tuner board details', () => {
    const date = {
      from: '2018-05-22T00:00:00Z',
      to: '2018-05-25T23:59:59Z'
    };
    const airlineIcao = 'aal';
    tvPerformanceService.ADMIN_API = `${environment.API}/api/v1/airline/`;
    tvPerformanceService.getAllFlights(airlineIcao, date).subscribe(res => {
      console.log(res);
    });
    const data = `${tvPerformanceService.ADMIN_API}${airlineIcao}/tv-performance/flights?`;
    const tunerReq = httpMock.expectOne(data + `fromDepartureTime=${date.from}&toDepartureTime=${date.to}`);
    expect(tunerReq.request.method).toEqual('GET');
    tunerReq.flush(null);
    httpMock.verify();
  });
});
