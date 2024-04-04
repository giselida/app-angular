import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const SLIDE_IN_OUT = trigger('slideInOut', [
  state(
    'false',
    style({
      width: '50px',
    })
  ),
  state(
    'true',
    style({
      width: '240px',
    })
  ),
  transition('true => false', animate('400ms ease-in-out')),
  transition('false => true', animate('400ms ease-in-out')),
]);
