import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Band } from '../models/band';

@Injectable({
  providedIn: 'root'
})
export class BandService {

  constructor(private http: HttpClient) { }

  createABand(newBand: Partial<Band>): Observable<any> {
    return this.http.post(`${environment.apBaseURL}/Band`, newBand);
  }

  getBandDetails(bandTitle: string): Observable<Band> {
    return this.http.get<Band>(`${environment.apBaseURL}/Band/GetBandDetails/${bandTitle}`);
  }

  getAllBands(): Observable<Band[]> {
    return this.http.get<Band[]>(`${environment.apBaseURL}/Band/GetBands`);
  }

  getBandMemberLimit(bandId: number): Observable<any> {
    return this.http.get(`${environment.apBaseURL}/Band/GetBandMemLimit/${bandId}`);
  }

  checkIfExists(bandTitle: string): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apBaseURL}/Band/CheckIfExists/${bandTitle}`);
  }

  updateBand(bandUpdate: Band): Observable<unknown> {
    return this.http.put(`${environment.apBaseURL}/Band`, bandUpdate);
  }

  removeBand(bandId: number): Observable<any> {
    return this.http.delete(`${environment.apBaseURL}/Band/RemoveBand/${bandId}`);
  }
}
