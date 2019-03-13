import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { FlightModel } from './airlineflights';


@Injectable({
  providedIn: 'root'
})
export class FlightService {

  API = `${environment.API}`;
  public ADMIN_API = this.API + '/api/v1/airline/';
  constructor(private http: HttpClient) { }


  getFlightList(id, fromDate, toDate, tailNumbers): Observable<FlightModel[]> {
    let argumentList = '';
    if (tailNumbers !== '') {
      argumentList = 'coverage=true&fromDepartureTime=' + fromDate +
        '&toDepartureTime=' + toDate + '&tailNumbers=' + tailNumbers;
    } else {
      argumentList = 'coverage=true&fromDepartureTime=' + fromDate +
        '&toDepartureTime=' + toDate;
    }
    return this.http.get<FlightModel[]>(this.ADMIN_API + id + '/flights?' + argumentList)
      .pipe(
      // tap(flightList => console.log(`fetched flight list: `, flightList)),
        catchError(this.handleError('getFlightList', []))
      );
  }

  getFlightDetails(ico, id): Observable<FlightModel[]> {
    const url = this.ADMIN_API + ico + '/flights/' + id;
    return this.http.get<any[]>(url)
      .pipe(
        // tap(flightList => console.log(`fetched flight details: `, flightList)),
        catchError(this.handleError('getFlightDetails', []))
      );
  }

  updateFlightDetails(ico, id, data): Observable<FlightModel[]> {
    const url = this.ADMIN_API + ico + '/flights/' + id;
    return this.http.put<FlightModel[]>(url, data)
      .pipe(
        // tap(flightList => console.log(`update flight details: `, flightList)),
        catchError(this.handleError('updateFlightDetails', []))
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
