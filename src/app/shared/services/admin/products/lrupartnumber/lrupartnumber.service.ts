import { environment } from '../../../../../../environments/environment';
import { Injectable } from '@angular/core';

import { LRUPartNumber } from './lruPartNumber';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LruPartNumberService {

  API = `${environment.API}`;
  public ADMIN_API = this.API + '/api/v1/products/lru-part-numbers';

  constructor(private http: HttpClient) { }

  /** GET LRUTypes */
  getLRUPartNumberList (): Observable<LRUPartNumber[]> {
    return this.http.get<LRUPartNumber[]>(this.ADMIN_API)
      .pipe(
        catchError(this.handleError('getLRUPartNumber', []))
      );
  }

  /** Delete LRUTypes */
  deleteLRUPartNumber(id): Observable<LRUPartNumber[]> {
    const listId = id;
    return this.http.delete<LRUPartNumber[]>(this.ADMIN_API + '/' + listId)
      .pipe(
        catchError(this.handleError('deleteLRUPartNumber', []))
      );
  }
  /** Create LRUTypes **/
  createLRUPartNumber(postData): Observable<LRUPartNumber[]> {
    return this.http.post<LRUPartNumber[]>(this.ADMIN_API, postData)
      .pipe(
        catchError(this.handleError('createLRUPartNumber', []))
      );
  }
  /** Update LRUTypes **/
  updateLRUPartNumber(postData): Observable<LRUPartNumber[]> {
    return this.http.put<LRUPartNumber[]>(this.ADMIN_API + '/' + postData.id, postData)
      .pipe(
        catchError(this.handleError('updateLRUPartNumber', []))
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  public handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }

}
