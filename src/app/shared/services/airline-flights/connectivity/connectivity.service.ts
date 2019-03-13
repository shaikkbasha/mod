import { Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ConnectivityService {

  API = `${environment.API}`;
  public flightData: Subject<any>;
  public ADMIN_API = this.API + '/api/v1/airline/';
  constructor(private http: HttpClient) {
    this.flightData = new Subject();
   }

  setFlightNumber(data: any) {
    this.flightData.next(data);
  }
  getKAlogDetails(params): Observable<any[]> {
    const url = params.airlineIcao + '/tails/' + params.tailNumber + '/flight-legs/' + params.flightLegId + '/ka-events';
    return this.http.get<any[]>(this.ADMIN_API + url)
      .pipe(
        // tap(flightList => console.log(`fetched KAlogDetails: `, flightList)),
        catchError(this.handleError('getKAlogDetails', []))
      );
  }

  getFlightDetails(params): Observable<any[]> {
    const url = params.airlineIcao + '/tails/' + params.tailNumber + '/flight-legs/' + params.flightLegId;
    return this.http.get<any[]>(this.ADMIN_API + url)
      .pipe(
        // tap(flightList => console.log(`fetched KAlogDetails: `, flightList)),
        catchError(this.handleError('getFlightDetails', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }
}
