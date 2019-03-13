import { environment } from '../../../../../environments/environment';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TunerService } from './tuner.service';
describe('TunerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  let tunerService: TunerService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [TunerService ]
    });
    tunerService = TestBed.get(TunerService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(tunerService).toBeTruthy();
  });
  xit('should get tuner board details', () => {
    const boardObj = {
      boardId: 1,
      tunerId: 2
    };
    const airlineIcao = 'aal';
    const flightId = '5c011a1e53b7fd001fec504a';
    tunerService.ADMIN_API = `${environment.API}/api/v1/airline/`;
    tunerService.getTunerDetails(flightId, airlineIcao, boardObj).subscribe(res => {
      console.log(res);
    });
    const data = `${tunerService.ADMIN_API}${airlineIcao}/tv-performance/flights/${flightId}/tuner/`;
    const tunerReq = httpMock.expectOne(data + `${boardObj.boardId}-${boardObj.tunerId}`);
    expect(tunerReq.request.method).toEqual('GET');
    tunerReq.flush(null);
    httpMock.verify();
  });
  it('should get tuner parameter details', () => {
    const filters = {
      tunerParam: 'boardNumber',
      boardParam: 1
    };
    const airlineIcao = 'aal';
    const flightId = '5c011a1e53b7fd001fec504a';
    tunerService.ADMIN_API = `${environment.API}/api/v1/airline/`;
    tunerService.getTunerParameterDetails(airlineIcao, flightId, filters).subscribe(res => {
      console.log(res);
    });
  });
});
