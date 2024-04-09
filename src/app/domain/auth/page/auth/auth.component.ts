import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import {
  AbstractControl,
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
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isSignUp: boolean = false;
  patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  patternName = /^[a-zA-ZÀ-ÖØ-öø-ÿ'-]+$/;
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

  getErrorMessage(control: AbstractControl) {
    const minlength = control.errors?.['minlength'];

    if (minlength) {
      return `Este campo deve conter no mínimo ${minlength.actualLength}/${minlength.requiredLength} caracteres`;
    }

    if (control.hasError('required'))
      return 'Este campo é obrigatório, Insira um valor ';

    if (control.hasError('name')) {
      return 'O nome deve conter apenas letras';
    }
    if (control.hasError('lastName')) {
      return 'O sobrenome deve conter apenas letras';
    }
    if (control.hasError('email')) {
      return 'Por favor, insira um email válido';
    }

    if (control.hasError('oneSpecialCharacter')) {
      return 'A senha deve conter pelo menos um caractere especial';
    }

    if (control.hasError('oneUpperCase')) {
      return 'A senha deve conter pelo menos uma letra maiúscula';
    }

    if (control.hasError('oneNumber')) {
      return 'A senha deve conter pelo menos uma letra maiúscula';
    }

    return '';
  }
}
