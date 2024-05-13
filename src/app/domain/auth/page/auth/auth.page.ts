import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  ErrorStateMatcher,
  ShowOnDirtyErrorStateMatcher,
} from '@angular/material/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { CustomMatFormFieldValidationDirective } from '../../../../shared/directives/forms/custom-mat-form-field-validation.directive';
import { StorageService } from '../../../../shared/services/storage/storage.service';
import { SharedModule } from '../../../../shared/shared.module';
import { CustomValidators } from '../../../../shared/validators/custom.validator';
import {
  UsersRequestSingIn,
  UsersResponse,
} from '../../interface/users.interface';
import { AuthService } from '../../service/auth.service';
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
export class AuthPage implements OnInit {
  isSignUp: boolean = false;
  patternEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  patternName = /^[a-zA-ZÀ-ÿ\s]+$/;
  oneSpecialCharacterPattern = /([!@#$%^&*()_+\-=[\]{};':"\\|,.<>?])/;
  oneUpperCasePattern = /.*[A-Z].*/;
  oneNumberPattern = /.*\d.*/;
  authService = inject(AuthService);
  router = inject(Router);
  usersResponse: UsersResponse[];
  user$: Observable<UsersResponse[]>;
  user: UsersResponse | undefined;
  id = '0';
  storageService = inject(StorageService);
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
  ngOnInit(): void {
    this.getUsers();
  }
  onLogin() {
    if (this.formGroupLogin.invalid) return;
    const formValue = this.formGroupLogin.value as UsersRequestSingIn;
    if (!formValue) return;
    this.user = this.authService.login(formValue);
    this.storageService.setItem('user', JSON.stringify(this.user) ?? '{}');
    this.router.navigate(['/products']);
  }
  singUp() {
    const formValue = this.formGroupSingUp.value as UsersResponse;
    if (this.formGroupSingUp.invalid) return;
    if (!formValue) return;

    this.authService.getOneUser(formValue.id)?.subscribe((value) => {
      this.user = value;
    });
    this.usersResponse = this.authService.singUp(formValue);

    if (formValue === this.user) return;
    this.storageService.setItem('user', JSON.stringify(this.user) ?? '{}');
    this.router.navigate(['/products']);
  }
  getUsers() {
    this.authService.getUsers().subscribe((value) => {
      this.usersResponse = value;
    });
    this.storageService.setItem(
      'users',
      JSON.stringify(this.usersResponse) ?? '[]'
    );
  }
}
