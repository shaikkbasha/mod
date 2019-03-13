import { environment } from '../../../../../environments/environment';
import { Injectable } from '@angular/core';

import { ProductsList } from './productsList';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  API = `${environment.API}`;
  public ADMIN_API = this.API + '/api/v1/products/';

  constructor(private http: HttpClient) { }

  /** GET LRU Names */
  getTreeList(): Observable<ProductsList[]> {
    return this.http.get<ProductsList[]>(this.ADMIN_API)
      .pipe(
        catchError(this.handleError('getTreeList', []))
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
