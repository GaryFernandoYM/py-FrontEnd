import { Component, ViewChildren, QueryList, ElementRef } from '@angular/core';
import { SidebarService } from 'src/app/shared/sidebar.service';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  @ViewChildren('buttons') buttons!: QueryList<ElementRef<HTMLButtonElement>>;
  @ViewChildren('content') content!: QueryList<ElementRef<HTMLDivElement>>;


  tabSeleccionado: number = 1;

  constructor(private sidebarService: SidebarService) {}


  ngAfterViewInit(): void {
    this.sidebarService.tabSeleccionado.subscribe((indice: number) => {
      this.tabSeleccionado = indice;
      this.mostrarPanel(indice);
    });
  
    this.mostrarPanel(1);
  }
  
  mostrarPanel(indice: number): void {
    this.content.forEach((element, index) => {
      if (index === indice) {
        element.nativeElement.classList.add('active');
      } else {
        element.nativeElement.classList.remove('active');
      }
    });
  }

}