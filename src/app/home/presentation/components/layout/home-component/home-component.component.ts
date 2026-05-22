import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import {HeaderContentComponent} from '../../../../../shared/presentation/components/header-content/header-content.component';

@Component({
  selector: 'app-home-component',
  imports: [HeaderContentComponent, RouterLink],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {

}
