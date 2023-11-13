import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CategoryModel } from '../models/category.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  
  private apiUrl = `${environment.apiUrl}/categoria`;

  constructor(private httpClient: HttpClient) { }

  getCategories():Observable<CategoryModel[]>{
    return this.httpClient.get<CategoryModel[]>(this.apiUrl).pipe(map(res => res));
  }
  createCategory(category: CategoryModel): Observable<CategoryModel> {
    return this.httpClient.post<CategoryModel>(`${this.apiUrl}`, category);
  }
  updateCategory(category: CategoryModel): Observable<CategoryModel> {
    const url = `${this.apiUrl}/${category.id}`;
    return this.httpClient.put<CategoryModel>(url, category);
  }
  getCategoryById(id: number): Observable<CategoryModel> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.get<CategoryModel>(url);
  }
  deleteCategory(id: number): Observable<void> {
    const url = `${this.apiUrl}/${id}`;
    return this.httpClient.delete<void>(url);
  }
}
