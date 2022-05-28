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

  getAllBands(): Observable<Band[]> {
    return this.http.get<Band[]>(`${environment.apBaseURL}/Band/GetBands`);
  }

  getBandMemberLimit(bandId: number): Observable<any> {
    return this.http.get(`${environment.apBaseURL}/Band/GetBandMemLimit/${bandId}`);
  }

  updateBand(bandUpdate: Band): Observable<unknown> {
    return this.http.put(`${environment.apBaseURL}/Band`, bandUpdate);
  }
}
