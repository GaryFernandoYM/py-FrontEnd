import { Injectable, EventEmitter } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  constructor() { }

    // Esto es del header-------------
  sidebarToggle: EventEmitter<void> = new EventEmitter<void>();

  toggleSidebar() {
    this.sidebarToggle.emit();
  }
  // Esto es del sidebar: expandir y contraer-------------
  toggleASidebar: EventEmitter<void> = new EventEmitter<void>();

  sidebarTogle(){
    this.toggleASidebar.emit();
  }

  // Esto es del main mostrarv paneles-------------

  tabSeleccionado = new Subject<number>();

  seleccionarTab(indice: number): void {
    this.tabSeleccionado.next(indice);
  }
  // Esto es del main mostrarv paneles  END-------------
}
