import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TunerService {

  public ADMIN_API = `${environment.API}/api/v1/airline/`;
  constructor(private http: HttpClient) { }

  getTunerDetails(id, icao, obj): Observable<any> {

    return this.http.get
    <any>(`${this.ADMIN_API}${icao}/tv-performance/flights/${id}/tuner/${obj.boardId}-${obj.tunerId}`)
      .pipe(
        // tap(offloadList => console.log(`fetched antenna list: `, offloadList)),
        catchError(this.handleError('antenna', []))
      );
  }

  getTunerParameterDetails(id, icao, filters): Observable<any> {
    const parameters = `${id}/tuner?tunerParameter=${filters.tunerParam}&boardNumber=${filters.boardParam}`;
    return this.http.get<any>(`${this.ADMIN_API}${icao}/tv-performance/flights/${parameters}`)
      .pipe(
        // tap(offloadList => console.log(`fetched antenna list: `, offloadList)),
        catchError(this.handleError('antenna', []))
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
