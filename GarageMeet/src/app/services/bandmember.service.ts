import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Bandmember } from '../models/bandmember';

@Injectable({
  providedIn: 'root'
})
export class BandmemberService {

  constructor(private http: HttpClient) { }

  getAllBandMems(bandId: number): Observable<Bandmember[]>{
    return this.http.get<Bandmember[]>(`${environment.apBaseURL}/BandMember/GetAllBandMembers/${bandId}`);
  }

  addBandMem(newBandMem: Partial<Bandmember>): Observable<any>{
    return this.http.post(`${environment.apBaseURL}/BandMember/AddBandMember`, newBandMem);
  }

  isInABand(userId: number): Observable<boolean> {
    return this.http.get<boolean>(`${environment.apBaseURL}/IsInABand/${userId}`);
  }
}
