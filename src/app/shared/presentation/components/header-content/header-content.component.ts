import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-header-content',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './header-content.component.html',
  styleUrl: './header-content.component.css'
})
export class HeaderContentComponent {

}
