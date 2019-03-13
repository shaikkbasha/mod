import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AntennaService {

  public ADMIN_API = `${environment.API}/api/v1/airline/`;
  constructor(private http: HttpClient) { }

  getFlightDetails(icao, id): Observable<any> {

    return this.http.get<any>(`${this.ADMIN_API}${icao}/tv-performance/flights/${id}`)
      .pipe(
        // tap(offloadList => console.log(`fetched flight details: `, offloadList)),
        catchError(this.handleError('antenna', []))
      );
  }

  getAntennaDetails(icao, id): Observable<any> {

    return this.http.get<any>(`${this.ADMIN_API}${icao}/tv-performance/flights/${id}/antenna`)
      .pipe(
        // tap(offloadList => console.log(`fetched antenna list: `, offloadList)),
        catchError(this.handleError('antenna', []))
      );
  }

  // exportAntennaData(icao, id) {
  //   const blob: any = 'blob';
  //   return this.http.get<any>(`${this.ADMIN_API}${icao}/tv-performance/flights/${id}/antenna/export`,
  //   {headers: new HttpHeaders({
  //     'Content-Type': 'application/json',
  //   }), responseType: blob})
  //     .pipe(
  //       // tap(offloadList => console.log(`fetched antenna list: `, offloadList)),
  //       catchError(this.handleError('antennaExport', []))
  //     );
  // }


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
