import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../Client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  endpointUrl = "https://tc2-locadora-backend.glitch.me/api";

  getAllPeople() : Observable<Client[]> {
    return this.http.get<Client[]>(this.endpointUrl + '/pessoas');
  }

  getPerson(id) : Observable<Client> {
    return this.http.get<Client>(this.endpointUrl + '/pessoas/' + id);
  }

  registerClient(client) : Observable<any> {
    let body = new HttpParams();
    body = body.set("name", client.name);
    body = body.set("sex", client.sex);
    body = body.set("birthDate", client.birthDate);
    body = body.set("phone", client.phone);
    body = body.set("adress", client.adress);
    body = body.set("isAtendente", client.isAtendente);
    return this.http.post(this.endpointUrl + '/pessoas', body, {observe: "response"});
  }
  
  updateClient(client) : Observable<any> {
    let body = new HttpParams();
    body = body.set("name", client.name);
    body = body.set("sex", client.sex);
    body = body.set("birthDate", client.birthDate);
    body = body.set("phone", client.phone);
    body = body.set("adress", client.adress);
    body = body.set("isAtendente", client.isAtendente);
    return this.http.put(this.endpointUrl + '/pessoas/' + client._id, body, {observe: "response"});
  }

  deleteClient(client) : Observable<any> {
    return this.http.delete(this.endpointUrl + '/pessoas/' + client._id);
  }

  constructor(private http : HttpClient) { }
}
