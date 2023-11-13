import { Component, ElementRef, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FormBuilder, Validators } from '@angular/forms';
import { ClientService } from 'src/app/services/client.service';
import { ClientModel } from 'src/app/models/client.model';

import {FormControl } from '@angular/forms';
@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit { 
 
  @ViewChild('open') openBtn!: ElementRef;
  @ViewChild('container') container!: ElementRef;
  @ViewChild('close') closeBtn!: ElementRef;
  @ViewChild('modal') modal!: ElementRef;
  @ViewChild('cancel') cancel!: ElementRef;
  @ViewChild('update') update!: ElementRef;

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
  // ----------------------para que aparsca solo crear o actualizar-.---------------------
  listClients: ClientModel [] = [];
  formClient: FormGroup = new FormGroup({});

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder
    ){}
  
  ngOnInit(): void {

      this.list();

      this.formClient = this.formBuilder.group({
        id: [''],
        nombres: ['',Validators.required],
        apellidos: ['',Validators.required],
        documento: ['',Validators.required],
        sexo: new FormControl(true),
        direccion: ['',Validators.required],
        telefono: ['',Validators.required]
      });
      
  }
  list(){
    this.clientService.getClients().subscribe(resp=>{
      if(resp){
        this.listClients = resp;
      }
    })
  }
  // ------------------create -------------------------
  save() {
    this.clientService.createClient(this.formClient.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formClient.reset();
      }
    });
  }
  // ---------------------------actualizar----------------------
  updateCli() {
    this.clientService.updateClient(this.formClient.value).subscribe(resp => {
      if (resp) {
        this.list();
        this.formClient.reset();
      }
    });
  } 
  
  sexoText(sexo: boolean): string {
    return sexo ? 'Masculino' : 'Femenino';
  }
  selectItem(client: ClientModel) {
    this.formClient.patchValue({
      id: client.id,
      nombres: client.nombres,
      apellidos: client.apellidos,
      documento: client.documento,
      sexo: client.sexo,
      direccion: client.direccion,
      telefono: client.telefono
    }); 
  }
  // ---------------------delet----------------------------
  delete(id: any) {
    this.clientService.deleteClient(id).subscribe(
      () => {
        this.list(); 
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
}
