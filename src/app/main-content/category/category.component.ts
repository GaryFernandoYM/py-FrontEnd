import { Component, ElementRef, ViewChild } from '@angular/core';
import { CategoryModel } from 'src/app/models/category.model';
import { OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';



@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

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
  }

  closeModal() {
    this.container.nativeElement.classList.remove('active-filter');
    this.modal.nativeElement.classList.remove('active-modal');
    this.cancel.nativeElement.classList.remove('active-modal');
  }

  // --------------------------funtions-Backend---------------------------------

  listCategory: CategoryModel [] = [];
  formCategory: FormGroup = new FormGroup({});

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
    ){}
  
  ngOnInit(): void {

      this.list();

      this.formCategory = this.formBuilder.group({
        id: [''],
        nombre: ['', Validators.required],
        descripcion: ['', Validators.required],
        estado: [true]
      });
      
  }
  list(){
    this.categoryService.getCategories().subscribe(resp=>{
      if(resp){
        this.listCategory = resp;
      }
    })
  }
  estadoText(estado: boolean): string {
    return estado ? 'activo' : 'inactivo';
  }
  // ------------------create -------------------------
  save() {
    this.categoryService.createCategory(this.formCategory.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formCategory.reset();
      }
    });
  }
  // ---------------------------actualizar----------------------
  update() {
    this.categoryService.updateCategory(this.formCategory.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formCategory.reset();
      }
    });
  }  
  selectItem(category: CategoryModel) {
    this.formCategory.patchValue({
      id: category.id,
      nombre: category.nombre,
      descripcion: category.descripcion,
      estado: category.estado,

    });

  }
  // ---------------------delet----------------------------
  delete(id: any) {
    this.categoryService.deleteCategory(id).subscribe(
      () => {
        this.list(); 
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
