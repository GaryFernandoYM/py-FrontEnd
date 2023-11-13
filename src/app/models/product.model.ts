import { CategoryModel } from "./category.model";

export class ProductModel {
    id: number = 0;
    nombre: string ='';
    descripcion: string = '';
    codigo: string = '';
    precio: number = 0.0;
    stock: number = 0;
    stockminimo: number = 0;
    categoryId: number = 0;
    categoria: CategoryModel = new CategoryModel();
}
