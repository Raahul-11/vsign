import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Table } from '../dashboard/dashboard';
@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  baseurl = 'http://localhost:50763/api/getDocList/getAllDocuments?Client=surya&Company=Exalca';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  };
  constructor(private httpClient: HttpClient) { }
  getDB(): Observable<Table[]> {
    return this.httpClient.get<Table[]>(`${this.baseurl}`);
  }
}
