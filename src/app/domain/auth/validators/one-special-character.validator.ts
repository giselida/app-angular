import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export class CustomValidators {
  static pattern(regex: RegExp, key: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const forbidden = !regex.test(control.value);
      return forbidden ? { [key]: { value: control.value } } : null;
    };
  }
}
