import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderContentComponent } from '../../../../../shared/presentation/components/header-content/header-content.component';
import { FooterContentComponent } from '../../../../../shared/presentation/components/footer-content/footer-content.component';

export interface Testimonial {
  name: string;
  role: string;
  quote: string;
  rating: number; // 1-5
  photoUrl?: string; // dejar vacío hasta tener la foto real (formato vertical, 3:4)
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
    quote: 'Lorem ipsum dolor sit amet, consecteeet dolore magna aliquam erat volutpat. Ut wisi enim ad minim Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh eu',
    rating: 5,
    visitsNote: '+30 visitas coordinadas',
    priceNote: 'Precio final de acuerdo al mercado'
  };

  readonly secondaryTestimonials: Testimonial[] = [
    {
      name: 'Rafael Ungaro',
      role: 'Alquiler en San Isidro',
      quote: 'Lorem ipsum dolor sit amet, consecteeet dolore magna aliquam erat volutpat. Ut wisi enim ad minim Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam',
      rating: 5
    },
    {
      name: 'Karin Barreto',
      role: 'Venta en Jesús María',
      quote: 'Lorem ipsum dolor sit amet, consecteeet dolore magna aliquam erat volutpat. Ut wisi enim ad minim Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam',
      rating: 5
    },
    {
      name: 'Giancarlo Tealdo',
      role: 'Venta en Lince',
      quote: 'Lorem ipsum dolor sit amet, consecteeet dolore magna aliquam erat volutpat. Ut wisi enim ad minim Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam',
      rating: 5
    }
  ];

  get ratingStars(): number[] {
    return Array.from({ length: 5 }, (_, i) => i);
  }
}
