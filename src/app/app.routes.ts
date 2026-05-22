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
];
