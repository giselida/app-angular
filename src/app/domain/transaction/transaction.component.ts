import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterModule } from '@angular/router';
import { MyLibComponent } from 'my-lib';
import { FormValidationDirective } from '../../shared/directives/forms/form-validation.directive';
import { UnlessDirective } from '../../shared/directives/unless/unless.directive';
import { CustomValidators } from '../../shared/validators/custom.validator';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    UnlessDirective,
    FormValidationDirective,
    MatFormFieldModule,
    MyLibComponent,
    FormsModule,
    MatInputModule,
  ],
  providers: [ShowOnDirtyErrorStateMatcher],
  templateUrl: './transaction.component.html',
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent {
  condition = true;
  form: FormGroup;
  control: FormControl;
  customErrors = { required: 'Please accept the terms' };
  constructor(private builder: FormBuilder) {}
  patternName = /^[a-zA-ZÀ-ÖØ-öø-ÿ'-]+$/;
  ngOnInit() {
    this.control = this.builder.control('', Validators.required);

    this.form = this.builder.group({
      name: [
        '',
        [
          Validators.maxLength(8),
          Validators.minLength(3),
          CustomValidators.pattern(this.patternName, 'name'),
          Validators.required,
        ],
      ],
      email: ['', [Validators.email]],
      terms: ['', Validators.requiredTrue],
      address: this.builder.group({
        city: ['', Validators.required],
        country: ['', Validators.required],
      }),
    });
  }
}
