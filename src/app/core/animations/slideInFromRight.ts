import {animate, query, stagger, style, transition, trigger} from '@angular/animations';

export const slideInFromRight = trigger('slideInFromRight', [
  transition('* => *', [
    // each time the products change
    query(
      'app-product-card',
      style({
        transform: 'translateX( 100%)',
        opacity: 0,

        filter: 'blur(50px)',
      }),
      {
        optional: true,
      },
    ),

    query(
      'app-product-card',
      stagger('200ms', [
        animate(
          '1s ease-out',
          style({
            transform: 'translateY(0)',
            opacity: 1,
            filter: 'blur(0px)',
          }),
        ),
      ]),
      {
        optional: true,
      },
    ),
  ]),
]);
