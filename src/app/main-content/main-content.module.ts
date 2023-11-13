import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StartComponent } from './start/start.component';
import { ProductComponent } from './product/product.component';
import { CategoryComponent } from './category/category.component';
import { ClientComponent } from './client/client.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { SalesComponent } from './sales/sales.component';

@NgModule({
  declarations: [
    StartComponent,
    ProductComponent,
    CategoryComponent,
    ClientComponent,
    SalesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    StartComponent,
    ProductComponent,
    CategoryComponent,
    ClientComponent,
    SalesComponent
  ]
})
export class MainContentModule { }
