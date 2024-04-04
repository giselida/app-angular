import { CommonModule, NgOptimizedImage } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterModule } from '@angular/router';

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
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.scss',
})
export class AuthComponent {
  isSignUp: boolean = false;
  patternPassword =
    /^(?=.*[!@#$%^&*()-_+=|{}[\]:;'"<>,.?/~])(?=.*[A-Z])(?=.*[0-9]).{8,}$/;
  patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  router = inject(Router);
  formGroupLogin = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(this.patternPassword),
    ]),
  });

  formGroupSingUp = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.pattern('^[a-zA-Z]+$'),
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.pattern(this.patternEmail),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
      Validators.pattern(this.patternPassword),
    ]),
  });

  getErrorMessage(control: AbstractControl) {
    const minlength = control.errors?.['minlength'];

    if (minlength) {
      return `Este campo deve conter ${minlength.actualLength}/${minlength.requiredLength} caracteres`;
    }
    if (control.hasError('required'))
      return 'Este campo é obrigatório, Insira um valor ';
    if (
      control === this.formGroupLogin.get('name') ||
      control === this.formGroupSingUp.get('name')
    ) {
      return 'O nome deve conter apenas letras';
    }
    if (control === this.formGroupSingUp.get('lastName')) {
      return 'O sobrenome deve conter apenas letras';
    }
    if (control === this.formGroupSingUp.get('email')) {
      return 'Por favor, insira um email válido';
    }
    if (
      control === this.formGroupLogin.get('password') ||
      control === this.formGroupSingUp.get('password')
    ) {
      return 'A senha deve conter pelo menos uma letra maiúscula, um número e um caractere especial';
    }

    return '';
  }
  login() {
    this.router.navigate(['/transaction']);
  }
}
