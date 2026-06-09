import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HeaderContentComponent } from '../../../../../shared/presentation/components/header-content/header-content.component';
import { FooterContentComponent } from '../../../../../shared/presentation/components/footer-content/footer-content.component';
import { PropertiesService } from '../../../../../properties/application/properties.service';
import { PropertyEntity } from '../../../../../properties/domain/model/Property.entity';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { environment } from '../../../../../../environments/environment';
import { PropertySearchParams} from '../../../../../properties/infrastructure/properties-response';
import {CurrencyPipe} from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import {OperationType} from '../../../../../properties/domain/model/enums/OperationType.enum';
import {PropertyType} from '../../../../../properties/domain/model/enums/PropertyType.enum';
import {Department} from '../../../../../properties/domain/model/enums/Department.enum';
import {District} from '../../../../../properties/domain/model/enums/District.enum';

@Component({
  selector: 'app-browse-component',
  standalone: true,
  imports: [
    HeaderContentComponent,
    MatCardModule,
    MatIconModule,
    FooterContentComponent,
    RouterLink,
    FormsModule,
    CurrencyPipe
  ],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent implements OnInit {

  readonly properties: PropertyEntity[] = [];

  searchParams: PropertySearchParams = {
    minPriceDollars: undefined,
    maxPriceDollars: undefined,
    department: undefined,
    district: undefined,
    propertyType: undefined,
    operationType: undefined,
    tags: []
  };

  showAdvanced = false;

  constructor(private readonly propertiesService: PropertiesService,
              private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      this.searchParams.operationType =
        params['operationType'] as OperationType;

      this.searchParams.propertyType =
        params['propertyType'] as PropertyType;

      this.searchParams.department =
        params['department'] as Department;

      this.searchParams.district =
        params['district'] as District;

      this.loadProperties();
    });

  }

  loadProperties(): void {
    // Usamos el método search del servicio pasando los parámetros actuales
    this.propertiesService.search(this.searchParams)
      .subscribe({
        next: (response) => {
          this.properties.length = 0;
          this.properties.push(...response);
        },
        error: (err) => {
          console.error('Error al cargar propiedades:', err);
          this.properties.length = 0;
        }
      });
  }

  onSearch(): void {
    // Al buscar, reiniciamos el estado (si fuera necesario) y llamamos al endpoint
    this.loadProperties();
  }

  // --- Helpers de Imagen (Mantenidos) ---
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

  toggleTag(tag: any): void {
    if (!this.searchParams.tags) {
      this.searchParams.tags = [];
    }

    const index = this.searchParams.tags.indexOf(tag);
    if (index > -1) {
      this.searchParams.tags.splice(index, 1);
    } else {
      this.searchParams.tags.push(tag);
    }
  }

  isTagSelected(tag: any): boolean {
    return this.searchParams.tags?.includes(tag) ?? false;
  }
}
