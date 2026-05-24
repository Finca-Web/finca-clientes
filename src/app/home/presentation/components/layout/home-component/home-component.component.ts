import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HeaderContentComponent } from '../../../../../shared/presentation/components/header-content/header-content.component';
import { PropertiesService } from '../../../../../properties/application/properties.service';
import { PropertyEntity } from '../../../../../properties/domain/model/Property.entity';
import { environment } from '../../../../../../environments/environment';
import {FooterContentComponent} from '../../../../../shared/presentation/components/footer-content/footer-content.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-component',
  standalone: true,
  imports: [HeaderContentComponent, MatCardModule, MatIconModule, FooterContentComponent, RouterLink],
  templateUrl: './home-component.component.html',
  styleUrl: './home-component.component.css'
})
export class HomeComponentComponent {
  readonly properties: PropertyEntity[] = [];

  constructor(private readonly propertiesService: PropertiesService) {
    this.loadFeatured();
  }

  private loadFeatured(): void {
    this.propertiesService.getFeatured().subscribe({
      next: (properties) => {
        this.properties.length = 0;
        this.properties.push(...properties);
      },
      error: () => {
        this.properties.length = 0;
      }
    });
  }

  private readonly assetsBaseUrl = this.getAssetsBaseUrl();

  getCoverImage(property: PropertyEntity): string {
    const cover = property.images?.find((image) => image.cover) ?? property.images?.[0];
    const filePath = cover?.filePath?.trim();

    if (!filePath) {
      return 'assets/HomeArt.png';
    }

    if (filePath.startsWith('http://') || filePath.startsWith('https://')) {
      return filePath;
    }

    if (filePath.startsWith('/')) {
      return `${this.assetsBaseUrl}${filePath}`;
    }

    return `${this.assetsBaseUrl}/${filePath}`;
  }

  private getAssetsBaseUrl(): string {
    const apiUrl = environment.serverBasePath.replace(/\/$/, '');
    const origin = new URL(apiUrl).origin;
    return origin;
  }

  editProperty(_property: PropertyEntity): void {
  }

  onDeleteProperty(_property: PropertyEntity): void {
  }
}
