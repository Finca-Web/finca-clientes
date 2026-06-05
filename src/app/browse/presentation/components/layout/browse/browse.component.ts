import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { HeaderContentComponent } from '../../../../../shared/presentation/components/header-content/header-content.component';
import { FooterContentComponent } from '../../../../../shared/presentation/components/footer-content/footer-content.component';
import { PropertiesService } from '../../../../../properties/application/properties.service';
import { PropertyEntity } from '../../../../../properties/domain/model/Property.entity';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-browse-component',
  standalone: true,
  imports: [HeaderContentComponent, MatCardModule, MatIconModule, FooterContentComponent, RouterLink],
  templateUrl: './browse.component.html',
  styleUrl: './browse.component.css'
})
export class BrowseComponent {
  readonly properties: PropertyEntity[] = [];

  currentPage = 0;
  readonly pageSize = 20;

  totalPages = 0;

  constructor(private readonly propertiesService: PropertiesService) {
    this.loadProperties();
  }

  loadProperties(): void {
    this.propertiesService.getPaged(this.currentPage, this.pageSize)
      .subscribe({
        next: (response) => {
          this.properties.length = 0;
          this.properties.push(...response.data);
          this.totalPages = response.totalPages;
        },
        error: () => {
          this.properties.length
            = 0;
        }
      });
  }

  nextPage(): void {
    if (this.currentPage < this.totalPages - 1) {
      this.currentPage++;
      this.loadProperties();
    }
  }

  previousPage(): void {
    if (this.currentPage > 0) {
      this.currentPage--;
      this.loadProperties();
    }
  }
}
