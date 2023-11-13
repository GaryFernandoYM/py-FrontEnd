import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { ProductModel } from '../models/product.model';
import { CategoryModel } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private apiUrl = `${environment.apiUrl}/producto`;

  constructor(private httpClient: HttpClient) { }

  getProducts(): Observable<ProductModel[]> {
    return this.httpClient.get<ProductModel[]>(this.apiUrl).pipe(map(res => res));
  }

  createProduct(prod: ProductModel): Observable<ProductModel> {
    prod.categoria = new CategoryModel();
    prod.categoria.id = prod.categoryId;
    return this.httpClient.post<ProductModel>(this.apiUrl, prod);
  }

  updateProduct(cli: ProductModel): Observable<ProductModel> {
    const url = `${this.apiUrl}/${cli.id}`;
    return this.httpClient.put<ProductModel>(url, cli);
  }

  getProductById(id: number): Observable<ProductModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<ProductModel>(url);
  }

  deleteProduct(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
  
  getCategories(): Observable<CategoryModel[]> {
    const categoriesUrl = `${environment.apiUrl}/categoria`;
    return this.httpClient.get<CategoryModel[]>(categoriesUrl);
  }
}