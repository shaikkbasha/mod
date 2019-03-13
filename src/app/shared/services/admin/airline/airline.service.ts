import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';

import { Airline } from './airline';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable()
export class AirlineService {

  public API = `${environment.API}`;
  public AIRLINES_API = this.API + '/api/v1/airlines';
  public USER_AIRLINE_API = this.API + '/api/v1/user/airlines';
  constructor(private http: HttpClient) { }

  /** GET airlines from the server */
  getAirlines(): Observable<Airline[]> {

    return this.http.get<Airline[]>(this.AIRLINES_API)
      .pipe(
        catchError(this.handleError('getAirlines', []))
      );
  }
  /** Delete Repair Stations */
  delete(id): Observable<Airline[]> {
    const deleteId = id;
    return this.http.delete<Airline[]>(this.AIRLINES_API + '/' + deleteId)
      .pipe(
        catchError(this.handleError('delete', []))
      );
  }
  create(postData): Observable<Airline[]> {
    return this.http.post<Airline[]>(this.AIRLINES_API, postData)
      .pipe(
        catchError(this.handleError('create', []))
      );
  }
  update(postData): Observable<Airline[]> {
    return this.http.put<Airline[]>(this.AIRLINES_API + '/' + postData.id, postData)
      .pipe(
        catchError(this.handleError('update', []))
      );
  }
  /** GET airlines from the server */
  getAirlineForUser(): Observable<Airline[]> {

    return this.http.get<Airline[]>(this.USER_AIRLINE_API)
      .pipe(
        catchError(this.handleError('getAirlineForUser', []))
      );
  }


   /** GET airlines by Icao from the server */
  getAirlineByIcao(icao): Observable<Airline[]> {
    const airlineIcao = icao;
    return this.http.get<Airline[]>(this.AIRLINES_API + '?airlineIcao=' + airlineIcao)
      .pipe(
        catchError(this.handleError('get', []))
      );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }

}
