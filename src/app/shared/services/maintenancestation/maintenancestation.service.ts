import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { Maintenancestation } from './maintenancestation';


@Injectable({
  providedIn: 'root'
})
export class MaintenancestationService {

  API = `${environment.API}`;
  public ADMIN_API = this.API + '/api/v1/maintenance-stations';

  constructor(private http: HttpClient) { }

   /** GET admin from the server */
  getMaintenanceStationlist (): Observable<Maintenancestation[]> {
    return this.http.get<Maintenancestation[]>(this.ADMIN_API)
      .pipe(
        catchError(this.handleError('getMaintenancestationlist', []))
      );
  }

  /** Delete Maintenance Stations */
  deleteMaintenanceStations(id): Observable<Maintenancestation[]> {
    const listId = id;
    return this.http.delete<Maintenancestation[]>(this.ADMIN_API + '/' + listId)
      .pipe(
        catchError(this.handleError('deleteMaintenanceStations', []))
      );
  }
  /** Create Maintenance Stations **/
  createMaintenanceStations(postData): Observable<Maintenancestation[]> {
    return this.http.post<Maintenancestation[]>(this.ADMIN_API, postData)
      .pipe(
        catchError(this.handleError('createMaintenanceStations', []))
      );
  }
  /** Update Maintenance Stations **/
  updateMaintenanceStations(postData): Observable<Maintenancestation[]> {
    return this.http.put<Maintenancestation[]>(this.ADMIN_API + '/' + postData.id, postData)
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
