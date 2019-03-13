import { environment } from '../../../../../../environments/environment';
import { Injectable } from '@angular/core';

import { LRUNames } from './lruNames';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class LruNameService {

  API = `${environment.API}`;
  public ADMIN_API = this.API + '/api/v1/products/lru-names';

  constructor(private http: HttpClient) { }

  /** GET LRU Names */
  getLRUNamelist(): Observable<LRUNames[]> {
    return this.http.get<LRUNames[]>(this.ADMIN_API)
      .pipe(
        catchError(this.handleError('getLRUNamelist', []))
      );
  }

  /** Delete LRU Names */
  deleteLRUName(id): Observable<LRUNames[]> {
    const listId = id;
    return this.http.delete<LRUNames[]>(this.ADMIN_API + '/' + listId)
      .pipe(
        catchError(this.handleError('deleteLRUName', []))
      );
  }
  /** Create LRU Names **/
  createLRUName(postData): Observable<LRUNames[]> {
    return this.http.post<LRUNames[]>(this.ADMIN_API, postData)
      .pipe(
        catchError(this.handleError('createLRUName', []))
      );
  }
  /** Update LRU Names **/
  updateLRUName(postData): Observable<LRUNames[]> {
    return this.http.put<LRUNames[]>(this.ADMIN_API + '/' + postData.id, postData)
      .pipe(
        catchError(this.handleError('updateLRUName', []))
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
