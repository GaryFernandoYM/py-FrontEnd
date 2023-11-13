import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { CategoryModel } from 'src/app/models/category.model';
import { ProductModel } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  @ViewChild('open') openBtn!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('close') closeBtn!: ElementRef;
  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('cancel') cancel!: ElementRef;

  isNew: boolean = true;
  isNewBtn: boolean = true;

  openModal(isNew: boolean, isNewBtn: boolean) {
    this.isNew = isNew;
    this.isNewBtn = isNewBtn;
    this.container.nativeElement.classList.add('active-filter');
    this.modal.nativeElement.classList.add('active-modal');
    this.selectedCategory = this.selectedCategoryOnUpdate;
  }

  closeModal() {
    this.container.nativeElement.classList.remove('active-filter');
    this.modal.nativeElement.classList.remove('active-modal');
    this.cancel.nativeElement.classList.remove('active-modal');
  }

  // ----------------dropdown------------

  public dropActivo = false; 
  public togleIco = false;

  openDropdown(){
    this.dropActivo = !this.dropActivo;
    this.togleIco = !this.togleIco;
  }

  // -------------------Metodos-Crud-------------------------

  listProducts: ProductModel [] = [];
  formProduct: FormGroup = new FormGroup({});
  categorias: CategoryModel [] = [];
  selectedCategory: CategoryModel | null = null;

  constructor(
    private productService: ProductService,
    private formBuilder: FormBuilder
  ){}

  ngOnInit(): void {
    this.list();
    this.listCategories();
    this.formProduct = this.formBuilder.group({
      id:  [''],
      nombre: ['',Validators.required],
      descripcion: ['',Validators.required],
      codigo: ['',Validators.required],
      precio: ['',Validators.required],
      stock: ['',Validators.required],
      stockminimo:['',Validators.required],
      categoryId: [0, Validators.required]
    }); 
  }


  // ----------Crear Productos--------------------
  selectedCategoryId: number = 0;

  save() {
    this.formProduct.patchValue({
      categoryId: this.selectedCategoryId,
      category: this.selectedCategory // Asignar la categoría seleccionada al campo 'category'
    });
  
    const product: ProductModel = this.formProduct.value;
    const selectedCategory = this.categorias.find(c => c.id === this.selectedCategoryId);
  
    if (selectedCategory) {
      product.categoryId = selectedCategory.id;
      product.categoria = selectedCategory;
    }
  
    this.productService.createProduct(product).subscribe(resp => {
      if (resp) {
        this.list();
        this.formProduct.reset();
        this.selectedCategory = null;
        this.selectedCategoryId = 0;
      }
    });
  }

  selectCategory(category: CategoryModel) {
    this.selectedCategoryId = category.id;
    this.selectedCategory = category; // Asigna la categoría seleccionada a la variable selectedCategory
    this.formProduct.patchValue({
      categoryId: this.selectedCategoryId,
      categoria: null // Mantener el campo 'categoria' como null
    });
  }
  listCategories() {
    this.productService.getCategories().subscribe(resp => {
      this.categorias = resp; // Asigna la respuesta de las categorías a la variable categoryList
    });
  }

  // ----------Listar Productos--------------------
  list(){
    this.productService.getProducts().subscribe(resp=>{
      if(resp){
        this.listProducts = resp;
      }
    })
  }

  //----------Update Products-----------------------
  update() {
    const product: ProductModel = this.formProduct.value;
    if (!product.categoryId) {
      const selectedCategory = this.categorias.find(c => c.id === this.selectedCategoryId);
      if (selectedCategory) {
        product.categoryId = selectedCategory.id;
        product.categoria = selectedCategory;
      }
    }
  
    this.productService.updateProduct(product).subscribe(resp => {
      if (resp) {
        this.list();
      }
    });
  }
  selectedCategoryOnUpdate: any;
  selectItem(prod: ProductModel, item: any) {
    this.formProduct.patchValue({
      id: prod.id,
      nombre: prod.nombre,
      descripcion: prod.descripcion,
      codigo: prod.codigo,
      precio: prod.precio,
      stock: prod.stock,
      stockminimo: prod.stockminimo      
    }); 
    this.selectedCategoryOnUpdate = item.categoria;
  }
  //----------Delete Products-----------------------
  delete(id: any) {
    this.productService.deleteProduct(id).subscribe(
      () => {
        this.list(); 
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  // -----------------------------
}