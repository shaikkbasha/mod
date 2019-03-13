import { environment } from '../../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class AdminService {

  private API = `${environment.API}`;
  private AIRLINES_API = this.API + '/api/v1/airlines';

  constructor(private http: HttpClient) { }

}
