import { Component } from '@angular/core';
import { SidebarService } from './shared/sidebar.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Frontend-PI';

  isSidebarHidden = false;

  constructor(private sidebarService: SidebarService) {
    this.sidebarService.sidebarToggle.subscribe(() => {
      this.closeSidebar();
    });
  }

  closeSidebar() {
    this.isSidebarHidden = !this.isSidebarHidden;
  }
}
