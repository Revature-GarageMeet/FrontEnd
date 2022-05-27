import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Band } from '../models/band';

@Injectable({
  providedIn: 'root'
})
export class BandService {

  constructor() { }

  createABand(newBand: Band): Observable<any> {
    
  }
}
