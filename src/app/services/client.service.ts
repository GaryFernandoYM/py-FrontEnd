import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ClientModel } from '../models/client.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  private apiUrl = `${environment.apiUrl}/cliente`;

  constructor(private httpClient: HttpClient) { }

  getClients():Observable<ClientModel[]>{
    return this.httpClient.get<ClientModel[]>(this.apiUrl).pipe(map(res => res));
  }
  createClient(cli: ClientModel): Observable<ClientModel> {
    return this.httpClient.post<ClientModel>(`${this.apiUrl}`, cli);
  }
  updateClient(cli: ClientModel): Observable<ClientModel> {
    const url = `${this.apiUrl}/${cli.id}`;
    return this.httpClient.put<ClientModel>(url, cli);
  }
  getClientById(id: number): Observable<ClientModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<ClientModel>(url); 
  }
  deleteClient(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
