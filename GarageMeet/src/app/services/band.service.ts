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

  createABand(newBand: Band): Observable<Band> {
    return this.http.post<Band>(`${environment.apBaseURL}/Band`, newBand);
  }
}
