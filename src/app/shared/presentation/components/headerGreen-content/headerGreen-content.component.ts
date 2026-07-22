import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-headerGreen-content',
  standalone: true,
  imports: [MatToolbarModule, RouterLink],
  templateUrl: './headerGreen-content.component.html',
  styleUrl: './headerGreen-content.component.css'
})
export class HeaderGreenContentComponent {
  isMobileMenuOpen = false;

  closeMobileMenu() {
    this.isMobileMenuOpen = false;
  }
}
