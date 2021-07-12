import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rent } from './Rent';

@Injectable({
  providedIn: 'root',
})
export class RentService {
  endpointUrl = 'https://tc2-locadora-backend.glitch.me/api';

  getRents(): Observable<Rent[]> {
    return this.http.get<Rent[]>(this.endpointUrl + '/locacoes');
  }

  createRent(rent: Rent): Observable<any> {
    let body = new HttpParams();
    body = body.set('movieId', rent.movieId);
    body = body.set('clienteId', rent.clienteId);
    body = body.set('atendenteId', rent.atendenteId);
    body = body.set('stardDate', rent.stardDate.toString());
    body = body.set('endDate', rent.endDate.toString());

    return this.http.post(this.endpointUrl + '/locacoes', body, {
      observe: 'response',
    });
  }

  deleteRent(id): Observable<any> {
    return this.http.delete(this.endpointUrl + '/locacoes/' + id);
  }

  constructor(private http: HttpClient) {}
}
