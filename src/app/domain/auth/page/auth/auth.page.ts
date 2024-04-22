import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { FormValidationDirective } from '../../../../shared/directives/forms/form-validation.directive';
import { UnlessDirective } from '../../../../shared/directives/unless/unless.directive';
import { CustomValidators } from '../../../../shared/validators/custom.validator';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatIconModule,
    MatInputModule,
    MatButtonModule,
    NgOptimizedImage,
    FormValidationDirective,
    UnlessDirective,
  ],
  providers: [
    { provide: ErrorStateMatcher, useClass: ShowOnDirtyErrorStateMatcher },
  ],
  templateUrl: './auth.page.html',
  styleUrl: './auth.page.scss',
})
export class AuthPage {
  isSignUp: boolean = false;
  patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  patternName = /^[a-zA-ZÀ-ÿ\s]+$/;
  oneSpecialCharacterPattern = /([!@#$%^&*()_+\-=[\]{};':"\\|,.<>?])/;
  oneUpperCasePattern = /.*[A-Z].*/;
  oneNumberPattern = /.*\d.*/;

  formGroupLogin = new FormGroup({
    name: new FormControl('Gisélida', [
      Validators.minLength(4),
      CustomValidators.pattern(this.patternName, 'name'),
      Validators.required,
    ]),
    password: new FormControl('@giH1700', [
      Validators.minLength(8),
      CustomValidators.pattern(this.oneNumberPattern, 'oneNumber'),
      CustomValidators.pattern(
        this.oneSpecialCharacterPattern,
        'oneSpecialCharacter'
      ),
      CustomValidators.pattern(this.oneUpperCasePattern, 'oneUpperCase'),
      Validators.required,
    ]),
  });

  formGroupSingUp = new FormGroup({
    name: new FormControl('', [
      Validators.minLength(4),
      CustomValidators.pattern(this.patternName, 'name'),
      Validators.required,
    ]),
    lastName: new FormControl('', [
      Validators.minLength(4),
      CustomValidators.pattern(this.patternName, 'lastName'),
      Validators.required,
    ]),
    email: new FormControl('', [
      CustomValidators.pattern(this.patternEmail, 'email'),
      Validators.required,
    ]),
    password: new FormControl('', [
      Validators.minLength(8),
      CustomValidators.pattern(this.oneNumberPattern, 'oneNumber'),
      Validators.required,
      CustomValidators.pattern(
        this.oneSpecialCharacterPattern,
        'oneSpecialCharacter'
      ),
      CustomValidators.pattern(this.oneUpperCasePattern, 'oneUpperCase'),
    ]),
  });
}
