import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClientModel } from 'src/app/models/client.model';
import { ProductModel } from 'src/app/models/product.model';
import { ClientService } from 'src/app/services/client.service';
import { ProductService } from 'src/app/services/product.service';
import { SaleService } from 'src/app/services/sale.service';

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css'],
})
export class SalesComponent {
  subtotal: number = 0;
  igv: number = 0;
  descuento: number = 0;
  total: number = 0;

  public cliActivo = false; 
  public cliIco = false;

  openDropdownCli(){
    this.cliActivo = !this.cliIco;
    this.cliIco = !this.cliIco;
  }
  public proActivo = false; 
  public proIco = false;
  openDropdownProd(){
    this.proActivo = !this.proActivo;
    this.proIco = !this.proIco;
  }

  products: ProductModel[] = [];
  clients: ClientModel[] = [];
  formSale: FormGroup = new FormGroup({});
  detail: any = [];

  constructor(private productService: ProductService,
    private clientService: ClientService,
     private formBuilder: FormBuilder,
     private saleService: SaleService) { }

  ngOnInit(): void {
    this.getProducts();
    this.getClients();

    this.formSale = this.formBuilder.group({
      serie: ['', Validators.required],
      numero: ['', Validators.required],
      descripcion: [''],
      cliente_id: ['', Validators.required], // Cambiado a "cliente_id"
      producto_id: [''], // Nuevo control de formulario para el producto
      detalle: [[]],
    });

    this.formSale.controls['cliente_id'].valueChanges.subscribe(val => {
      if (val) {
        this.getFindById(val);
      }
    });
  }

  getProducts(): void {
    this.productService.getProducts().subscribe(reponse => {
      this.products = reponse;
    });
  }

  getClients(): void {
    this.clientService.getClients().subscribe(response => {
      this.clients = response;
    });
  }

  public save(): void {
    this.formSale.value.detalle = this.detail;
    if (this.formSale.valid) {
      this.saleService.createSale(this.formSale.value).subscribe(response => {
        console.log(response);
      });
    }
    console.log(this.formSale.value);
  }

  limpiar(): void {
    // Lógica para limpiar los datos, restablecer valores, etc.
    this.formSale.reset(); // Esto es un ejemplo, puedes ajustar según tus necesidades
    this.detail = []; // Asegúrate de limpiar también el detalle u otros datos relevantes
  }

  getFindById(id: string): void {
    const result = this.products.find(d => d.id === parseInt(id));

    if (result) {
      const detalleItem: any = {
        cantidad: 0,
      };

      if (result.precio !== undefined) {
        detalleItem.precio = result.precio;
      }

      if (result.id !== undefined) {
        detalleItem.producto_id = result.id;
      }

      if (result.nombre !== undefined) {
        detalleItem.nombre = result.nombre;
      }

      this.detail.push(detalleItem);
      this.actualizarTotales();
    }
  }

  incrementarCantidad(item: any) {
    item.cantidad++;
    // Lógica para actualizar totales cuando cambia la cantidad
    this.actualizarTotales();
  }

  decrementarCantidad(item: any) {
    if (item.cantidad > 0) {
      item.cantidad--;
      // Lógica para actualizar totales cuando cambia la cantidad
      this.actualizarTotales();
    }
  }

  eliminarItem(index: number) {
    this.detail.splice(index, 1);
    // Lógica para actualizar totales cuando se elimina un detalle
    this.actualizarTotales();
  }

  // Método para actualizar totales cuando cambia la cantidad o se elimina un detalle
  actualizarTotales() {
    // Lógica para calcular subtotal, igv, descuento y total
    this.subtotal = this.calcularSubtotal();
    this.igv = this.calcularIgv();
    this.actualizarTotalConDescuento();
  }

  // Lógica para calcular el subtotal
  calcularSubtotal(): number {
    return this.detail.reduce((acc: number, item: any) => acc + (item.cantidad * (item.precio || 0)), 0);
  }

  // Lógica para calcular el IGV (impuesto general a las ventas)
  calcularIgv(): number {
    // Puedes ajustar la lógica según tus necesidades
    return this.subtotal * 0.18; // 18% de IGV
  }

  // Lógica para calcular el total considerando el descuento
  actualizarTotalConDescuento() {
    this.total = this.subtotal + this.igv;
  }

  calcularTotal(): number {
    // Puedes ajustar la lógica según tus necesidades
    return this.total; // 18% de IGV
  }
}
