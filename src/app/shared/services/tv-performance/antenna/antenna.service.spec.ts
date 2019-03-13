import { environment } from '../../../../../environments/environment';
import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { AntennaService } from './antenna.service';

describe('AntennaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  let httpMock: HttpTestingController;
  let antennaService: AntennaService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AntennaService]
    });
    httpMock = TestBed.get(HttpTestingController);
    antennaService = TestBed.get(AntennaService);
  });

  it('should be created', () => {
    expect(antennaService).toBeTruthy();
  });

  it('should get flight details', () => {
    const flightDetails = {};
    flightDetails['airlineIcao'] = 'aal';
    flightDetails['flightId'] = '5c011a1e53b7fd001fec504a';
    antennaService.ADMIN_API = `${environment.API}/api/v1/airline/`;
    antennaService.getFlightDetails(flightDetails['airlineIcao'], flightDetails['flightId']).subscribe(res => {
      console.log(res);
    });
    const param = `${flightDetails['flightId']}`;
    const antennaReq = httpMock.expectOne(`${antennaService.ADMIN_API}${flightDetails['airlineIcao']}/tv-performance/flights/` + param);
    expect(antennaReq.request.method).toEqual('GET');
    antennaReq.flush(null);
    httpMock.verify();
  });
  it('should get antenna details', () => {
    const airlineIcao = 'aal';
    const flightId = '5c011a1e53b7fd001fec504a';
    antennaService.ADMIN_API = `${environment.API}/api/v1/airline/`;
    antennaService.getAntennaDetails(airlineIcao, flightId).subscribe(res => {
      console.log(res);
    });
    const params = `${flightId}/antenna`;
    const antennaReq = httpMock.expectOne(`${antennaService.ADMIN_API}${airlineIcao}/tv-performance/flights/` + params);
    expect(antennaReq.request.method).toEqual('GET');
    antennaReq.flush(null);
    httpMock.verify();
  });

});
