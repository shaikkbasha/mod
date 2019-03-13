import { Injectable } from '@angular/core';
import { RepairRepairsStations } from './repairs';
import { environment } from './../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RepairsService {
  private API = `${environment.API}`;
  public ADMIN_API = this.API + '/api/v1/';
  constructor(private http: HttpClient) {
  }
  private _repairStaredFrom: string;

  set repairStaredFrom(data) {
    this._repairStaredFrom = data;
  }

  get repairStaredFrom() {
    return this._repairStaredFrom;
}
  getApiCall(apiUrl): Observable<RepairRepairsStations[]> {
    return this.http.get<RepairRepairsStations[]>(this.ADMIN_API + apiUrl)
      .pipe(
        catchError(this.handleError('getRepair', []))
      );
  }
  getRepair(): Observable<any[]> {
    return this.getApiCall('repair-stations');
  }
  getLru(serialNumber: any): Observable<any[]> {
    return this.getApiCall('removals/lru-serial-number?lruSerialNumber=' + serialNumber);
  }
  getMaintenanceStationlist (): Observable<any[]> {
    return this.getApiCall('maintenance-stations');
  }
  getAirlinelist(): Observable<any[]> {
    return this.getApiCall('airlines');
  }
  getTails(id: number) {
    return this.getApiCall( 'airline/' + id + '/tails');

  }
  getLruName(): Observable<any[]> {
    return this.getApiCall('products/lru-names');
  }
  getLruPartNumber(): Observable<any[]> {
    return this.getApiCall('products/lru-part-numbers');
  }
  ReasonRemoval(): Observable<any[]> {
    return this.getApiCall('products/reason-of-removals');
  }

  createRemoval(postData): Observable<any[]> {
    return this.http.post<any[]>(this.ADMIN_API + 'removals', postData)
      .pipe(
        catchError(this.handleError('create', []))
      );
  }

  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      return of(error as T);
    };
  }

}
