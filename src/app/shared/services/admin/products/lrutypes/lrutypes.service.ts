import { environment } from '../../../../../../environments/environment';
import { Injectable } from '@angular/core';

import { LRUTypes } from './lruTypes';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LruTypeService {

  API = `${environment.API}`;
  public ADMIN_API = this.API + '/api/v1/products/lru-types';

  constructor(private http: HttpClient) { }

  /** GET LRUTypes */
  getLRUTypeslist (): Observable<LRUTypes[]> {
    return this.http.get<LRUTypes[]>(this.ADMIN_API)
      .pipe(
        tap(LRUTypeslist => {}),
        catchError(this.handleError('getLRUTypes', []))
      );
  }

  /** Delete LRUTypes */
  deleteLRUTypes(id): Observable<LRUTypes[]> {
    const listId = id;
    return this.http.delete<LRUTypes[]>(this.ADMIN_API + '/' + listId)
      .pipe(
        tap(response => {}),
        catchError(this.handleError('deleteLRUTypes', []))
      );
  }
  /** Create LRUTypes **/
  createLRUTypes(postData): Observable<LRUTypes[]> {
    return this.http.post<LRUTypes[]>(this.ADMIN_API, postData)
      .pipe(
        tap(response => {}),
        catchError(this.handleError('createLRUTypes', []))
      );
  }
  /** Update LRUTypes **/
  updateLRUTypes(postData): Observable<LRUTypes[]> {
    return this.http.put<LRUTypes[]>(this.ADMIN_API + '/' + postData.id, postData)
      .pipe(
        tap(response => {}),
        catchError(this.handleError('updateLRUTypes', []))
      );
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(error as T);
    };
  }

}
