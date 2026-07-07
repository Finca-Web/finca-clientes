import { Component } from '@angular/core';
import {HeaderGreenContentComponent} from '../../../../../shared/presentation/components/headerGreen-content/headerGreen-content.component';
import {FooterContentComponent} from '../../../../../shared/presentation/components/footer-content/footer-content.component';
import {Router} from '@angular/router';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-selling-component',
  standalone: true,
  imports: [
    HeaderGreenContentComponent,
    FooterContentComponent,
    ReactiveFormsModule
  ],
  templateUrl: './selling-component.component.html',
  styleUrl: './selling-component.component.css'
})
export class SellingComponentComponent {
  contactForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      nombres: ['', Validators.required],
      apellidos: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  }

  enviarWhatsApp() {
    if (this.contactForm.valid) {
      const { nombres, apellidos, correo, mensaje } = this.contactForm.value;
      const numeroWhatsApp = '51923529731';

      const textoMensaje = `¡Hola! Vengo de la pagina web y me gustaría más información.\n\n*Mis datos:*\n- Nombre: ${nombres} ${apellidos}\n- Correo: ${correo}\n- Mensaje: ${mensaje}`;

      const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(textoMensaje)}`;
      window.open(url, '_blank');

      this.contactForm.reset();
    } else {
      this.contactForm.markAllAsTouched();
    }
  }
}
