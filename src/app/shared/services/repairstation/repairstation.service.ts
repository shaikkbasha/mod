import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Repairstations } from './repairstation';


@Injectable({
  providedIn: 'root'
})
export class RepairstationService {
  private API = `${environment.API}`;
  public ADMIN_API = this.API + '/api/v1/repair-stations';

  constructor(private http: HttpClient) { }

   /** GET admin from the server */
  getRepairStationslist (): Observable<Repairstations[]> {
    return this.http.get<Repairstations[]>(this.ADMIN_API)
      .pipe(
         catchError(this.handleError('getRepairstationlist', []))
      );
  }
  /** Delete Repair Stations */
  deleteRepairStations(id): Observable<Repairstations[]> {
    const deleteId = id;
    return this.http.delete<Repairstations[]>(this.ADMIN_API + '/' + deleteId)
      .pipe(
        catchError(this.handleError('deleteMaintenanceStations', []))
      );
  }
  /** Create Repair Stations **/
  createRepairStations(postData): Observable<Repairstations[]> {
    return this.http.post<Repairstations[]>(this.ADMIN_API, postData)
      .pipe(
        catchError(this.handleError('createMaintenanceStations', []))
      );
  }
  /** Update Repair Stations **/
  updateRepairStation(postData): Observable<Repairstations[]> {
    return this.http.put<Repairstations[]>(this.ADMIN_API + '/' + postData.id, postData)
      .pipe(
          catchError(this.handleError('updateMaintenanceStations', []))
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
