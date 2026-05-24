import { Routes } from '@angular/router';
const baseTitle = 'Finca Verde';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'home'
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./home/presentation/components/layout/home-component/home-component.component')
        .then(m => m.HomeComponentComponent),
    title: `${baseTitle} - Home`
  },
  {
    path: 'properties/:id',
    loadComponent: () =>
      import('./properties/presentation/components/property-detail/property-detail.component')
        .then(m => m.PropertyDetailComponent),
    title: `${baseTitle} - Propiedad`
  },
];
