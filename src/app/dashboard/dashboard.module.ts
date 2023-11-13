import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { MainComponent } from './main/main.component';
import { MainContentModule } from '../main-content/main-content.module';
@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
    MainComponent
  ],
  imports: [
    CommonModule, 
    MainContentModule
  ],
  exports:[
    HeaderComponent,
    SidebarComponent,
    MainComponent
  ]
})
export class DashboardModule { }
