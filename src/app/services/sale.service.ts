import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { SaleModel } from '../models/sale.model';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class SaleService {
  private apiUrl = `${environment.apiUrl}/venta`;
  constructor(private httpClient: HttpClient) { }
  getSales():Observable<SaleModel[]>{
    return this.httpClient.get<SaleModel[]>(this.apiUrl).pipe(map(res => res));
  }
  createSale(cli: any): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}`, cli);
  }
}
