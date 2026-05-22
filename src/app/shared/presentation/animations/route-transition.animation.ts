import { animate, group, query, style, transition, trigger } from '@angular/animations';

export const routeTransition = trigger('routeTransition', [
  transition('DashboardPage <=> PropertiesPage', [
    style({ position: 'relative' }),
    query(':enter, :leave', [style({ position: 'absolute', top: 0, left: 0, width: '100%' })], {
      optional: true
    }),
    query(':leave', [style({ zIndex: 1 })], { optional: true }),
    query(':enter', [style({ opacity: 0, transform: 'translateY(10px)', zIndex: 2 })], { optional: true }),
    group([
      query(':leave', [animate('170ms cubic-bezier(0.4, 0, 1, 1)', style({ opacity: 0, transform: 'translateY(-6px)' }))], {
        optional: true
      }),
      query(':enter', [animate('300ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))], {
        optional: true
      })
    ])
  ]),
  transition('* <=> *', [
    style({ position: 'relative' }),
    query(':enter, :leave', [style({ position: 'absolute', top: 0, left: 0, width: '100%' })], {
      optional: true
    }),
    query(':leave', [style({ zIndex: 1 })], { optional: true }),
    query(':enter', [style({ opacity: 0, transform: 'translateY(8px)', zIndex: 2 })], { optional: true }),
    group([
      query(':leave', [animate('150ms cubic-bezier(0.4, 0, 1, 1)', style({ opacity: 0, transform: 'translateY(-5px)' }))], {
        optional: true
      }),
      query(':enter', [animate('270ms cubic-bezier(0.16, 1, 0.3, 1)', style({ opacity: 1, transform: 'translateY(0)' }))], {
        optional: true
      })
    ])
  ])
]);

