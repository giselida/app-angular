import {
  animate,
  animation,
  style,
  transition,
  trigger,
  useAnimation,
} from '@angular/animations';
export const fadeIn = animation([
  style({ opacity: 0 }), // start state
  animate('{{time}}', style({ opacity: 1 })),
]);

export const fadeOut = animation([animate('{{time}}', style({ opacity: 0 }))]);

export const CAROUSEL = trigger('carouselAnimation', [
  transition('void => *', [
    useAnimation(fadeIn, { params: { time: '400ms' } }),
  ]),
  transition('* => void', [
    useAnimation(fadeOut, { params: { time: '400ms' } }),
  ]),
]);
