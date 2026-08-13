import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContentComponent } from '../../../../../shared/presentation/components/header-content/header-content.component';
import { FooterContentComponent } from '../../../../../shared/presentation/components/footer-content/footer-content.component';

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number;
  photoUrl?: string;
  visitsNote?: string;
  priceNote?: string;
}

@Component({
  selector: 'app-testimonies-component',
  standalone: true,
  imports: [CommonModule, HeaderContentComponent, FooterContentComponent],
  templateUrl: './testimonies-component.html',
  styleUrl: './testimonies-component.css'
})
export class TestimoniesComponent {
  // TODO: reemplazar el texto lorem ipsum con testimonios reales antes de publicar

  readonly featuredTestimonial: Testimonial = {
    name: 'Victoria Amable',
    role: 'Vendió su casa en La Planicie',
    quote: 'Confiar la venta de mi casa a Finca Verde fue la mejor decisión. Pensé que sería un proceso complicado, pero ellos se encargaron de todo. ' +
      'Recibí visitas realmente interesadas y al final lograron vender mi casa a un muy buen precio. Siempre estuvieron pendientes de mí y resolvieron cada duda. ' +
      'Me hicieron sentir que mi propiedad estaba en buenas manos.',
    photoUrl: 'https://res.cloudinary.com/diahho4fm/image/upload/v1785561355/VICTORIA_AMABLE_-_VERTICAL_ewl6i2.png',
    rating: 5,
    visitsNote: '+30 visitas coordinadas',
    priceNote: 'Precio final de acuerdo al mercado'
  };

  readonly secondaryTestimonials: Testimonial[] = [
    {
      name: 'Rafael Ungaro',
      role: 'Alquiler en San Isidro',
      quote: 'Necesitábamos alquilar varias oficinas en San Isidro y buscábamos una inmobiliaria que entendiera nuestras necesidades. Finca Verde nos ' +
        'acompañó en todo el proceso con mucha seriedad y organización. Se encargaron de encontrar a los inquilinos adecuados, coordinar cada visita ' +
        'y mantenernos informados en todo momento. Gracias a su gestión logramos alquilar 8 oficinas de manera eficiente y sin complicaciones.',
      rating: 5,
      photoUrl: 'https://res.cloudinary.com/diahho4fm/image/upload/v1785562023/RAFAEL_UNGARO_-_VERTICAL_hcyyh9.png'
    },
    {
      name: 'Karin Barreto',
      role: 'Venta en Jesús María',
      quote: 'Desde el primer día sentí que mi departamento estaba en buenas manos. En solo un mes, Finca Verde logró venderlo a un excelente precio y me acompañó en cada etapa del proceso, ' +
        'resolviendo todas mis dudas. Destaco su profesionalismo, transparencia y el trato cercano que brindan. ¡Los recomiendo totalmente!',
      rating: 5,
      photoUrl: 'https://res.cloudinary.com/diahho4fm/image/upload/v1785562042/KARIN_BARRETO_-_VERTICAL_u9nnid.png'

    },
    {
      name: 'Giancarlo Tealdo',
      role: 'Venta en Lince',
      quote: 'Mi departamento en Lince era muy bonito y quería venderlo al mejor precio posible. Finca Verde fue honesta conmigo y me ayudó a ' +
        'ajustar el precio para atraer compradores. Gracias a su estrategia, llegaron las visitas y concretamos la venta. Lo mejor fue la confianza ' +
        'y el buen trato durante todo el proceso.',
      rating: 5,
      photoUrl: 'https://res.cloudinary.com/diahho4fm/image/upload/v1785562062/GIANCARLO_TEALDO_-_VERTICAL_roqaz7.png'

    }
  ];

  get ratingStars(): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }
}
