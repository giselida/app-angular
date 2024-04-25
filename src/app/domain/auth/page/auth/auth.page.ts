import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { Router } from '@angular/router';
import { CustomMatFormFieldValidationDirective } from '../../../../shared/directives/forms/custom-mat-form-field-validation.directive';
import { SharedModule } from '../../../../shared/shared.module';
import { CustomValidators } from '../../../../shared/validators/custom.validator';
import { UsersRequestSingIn } from '../../interface/users.interface';
import { AuthService } from '../../service/user.service';
@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [CommonModule, SharedModule, CustomMatFormFieldValidationDirective],
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
  authService = inject(AuthService);
  router = inject(Router);

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
  onLogin() {
    if (this.formGroupLogin.invalid) return;
    const formValue = this.formGroupLogin.value as UsersRequestSingIn;
    if (!formValue) return;
    this.authService.login(formValue);
    this.router.navigate(['/products']);
  }
}
