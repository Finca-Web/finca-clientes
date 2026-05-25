import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PropertiesService } from '../../../application/properties.service';
import { PropertyEntity } from '../../../domain/model/Property.entity';
import { PropertyImageEntity } from '../../../domain/model/PropertyImage.entity';
import { environment } from '../../../../../environments/environment';
import {HeaderContentComponent} from '../../../../shared/presentation/components/header-content/header-content.component';
import {FooterContentComponent} from '../../../../shared/presentation/components/footer-content/footer-content.component';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [HeaderContentComponent, FooterContentComponent],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.css'
})
export class PropertyDetailComponent implements OnInit {
  title = '';
  imageUrls: string[] = [];
  currentIndex = 0;
  isTransitioning = false;
  transitionDirection: 'left' | 'right' | null = null;
  property: PropertyEntity | null = null;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly propertiesService: PropertiesService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const id = idParam ? Number(idParam) : NaN;

    if (Number.isNaN(id)) {
      this.title = '';
      return;
    }

    this.propertiesService.getById(id).subscribe({
      next: (property: PropertyEntity) => {
        this.property = property;
        this.title = property.title ?? '';
        this.imageUrls = this.buildImageUrls(property);
        this.currentIndex = 0;
      },
      error: () => {
        this.property = null;
        this.title = '';
        this.imageUrls = [];
        this.currentIndex = 0;
      }
    });
  }

  get currentImageUrl(): string {
    return this.imageUrls[this.currentIndex] ?? '/assets/HomeArt.png';
  }

  showPrevious(): void {
    if (this.imageUrls.length === 0) {
      return;
    }

    this.animateTransition('left');
    this.currentIndex = (this.currentIndex - 1 + this.imageUrls.length) % this.imageUrls.length;
  }

  showNext(): void {
    if (this.imageUrls.length === 0) {
      return;
    }

    this.animateTransition('right');
    this.currentIndex = (this.currentIndex + 1) % this.imageUrls.length;
  }

  private animateTransition(direction: 'left' | 'right'): void {
    this.isTransitioning = true;
    this.transitionDirection = direction;
    setTimeout(() => {
      this.isTransitioning = false;
      this.transitionDirection = null;
    }, 320);
  }

  private buildImageUrls(property: PropertyEntity): string[] {
    const images = [...(property.images ?? [])].sort((a: PropertyImageEntity, b: PropertyImageEntity) => {
      if (a.cover && !b.cover) return -1;
      if (!a.cover && b.cover) return 1;
      return a.displayOrder - b.displayOrder;
    });

    if (images.length === 0) {
      return ['/assets/HomeArt.png'];
    }

    return images.map((image) => this.resolveImageUrl(image.filePath));
  }

  private resolveImageUrl(filePath: string): string {
    const trimmed = filePath?.trim();

    if (!trimmed) {
      return '/assets/HomeArt.png';
    }

    if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) {
      return trimmed;
    }

    const apiUrl = environment.serverBasePath.replace(/\/$/, '');
    const origin = new URL(apiUrl).origin;

    if (trimmed.startsWith('/')) {
      return `${origin}${trimmed}`;
    }

    return `${origin}/${trimmed}`;
  }
}
