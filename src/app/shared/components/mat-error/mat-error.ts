import { Component, Input } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector:
    'mat-error.mat-mdc-form-field-error.mat-mdc-form-field-bottom-align',
  standalone: true,
  imports: [MatFormFieldModule],
  template: ` {{ error }} `,
})
export class MatErrorComponent {
  @Input() error?: string;
}
