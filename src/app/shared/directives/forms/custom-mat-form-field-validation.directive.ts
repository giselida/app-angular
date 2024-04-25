import {
  AfterViewInit,
  ComponentFactoryResolver,
  ComponentRef,
  ContentChild,
  Directive,
  ElementRef,
  EmbeddedViewRef,
  Injector,
  Renderer2,
} from '@angular/core';
import { NgControl } from '@angular/forms';
import { MatFormField, MatInput } from '@angular/material/input';
import { fromEvent } from 'rxjs';
import { MatErrorComponent } from '../../components/mat-error/mat-error';

const ERROS_VALIDATION: { [key: string]: Function } = {
  required: () => 'Este campo é obrigatório, Insira um valor',
  minlength: ({
    actualLength,
    requiredLength,
  }: {
    actualLength: number;
    requiredLength: number;
  }) =>
    `Este campo deve conter no mínimo ${actualLength}/${requiredLength} caracteres`,
  maxlength: ({
    actualLength,
    requiredLength,
  }: {
    actualLength: number;
    requiredLength: number;
  }) =>
    `Este campo deve conter no mínimo ${actualLength}/${requiredLength} caracteres`,
  email: () => 'Por favor, insira um email válido',
  name: () => 'O nome deve conter apenas letras',
  lastName: () => 'O sobrenome deve conter apenas letras',
  oneSpecialCharacter: () =>
    'A senha deve conter pelo menos um caractere especial',
  oneUpperCase: () => 'A senha deve conter pelo menos uma letra maiúscula',
  oneNumber: () => 'A senha deve conter pelo menos um numero',
};

@Directive({
  selector: 'mat-form-field',
  standalone: true,
})
export class CustomMatFormFieldValidationDirective implements AfterViewInit {
  componentRef?: ComponentRef<MatErrorComponent>;
  constructor(
    private readonly matFormField: MatFormField,
    private readonly renderer2: Renderer2,
    private readonly componentFactoryResolver: ComponentFactoryResolver,
    private readonly injector: Injector,
    private readonly elementRef: ElementRef
  ) {}
  @ContentChild(NgControl) private control: NgControl;
  @ContentChild(MatInput) private matInput: MatInput;

  ngAfterViewInit() {
    fromEvent(this.matInput['_elementRef'].nativeElement, 'blur').subscribe(
      (value) => {
        const key = this.getErrorKey();

        const $wrapper = this.elementRef.nativeElement.querySelector(
          '.mat-mdc-form-field-subscript-wrapper'
        );

        const $hint = $wrapper.querySelector(
          '.mat-mdc-form-field-hint-wrapper'
        );

        if ($hint) {
          $hint.style.transition =
            'opacity 0.2s ease-in-out , transform 0.3s ease-in-out';
          $hint.style.opacity = 0;
          $hint.style.transform = 'translateY(-50%)';
        }

        if (!this.componentRef) {
          this.componentRef = this.componentFactoryResolver
            .resolveComponentFactory(MatErrorComponent)
            .create(this.injector);
        }

        this.createOrUpdateWrapper($wrapper);

        const error =
          ERROS_VALIDATION?.[key]?.call(this, this.control.errors?.[key]) ?? '';
        this.componentRef!.instance.error = error;

        if (error === '' && $hint) {
          $hint.style.opacity = 1;
          $hint.style.transform = 'translateY(0%)';
        }

        this.componentRef.changeDetectorRef.detectChanges();
      }
    );
  }

  private createOrUpdateWrapper(wrapper: any) {
    const $matError = (this.componentRef!.hostView as EmbeddedViewRef<any>)
      .rootNodes[0] as HTMLElement;

    let $errorWrapper = this.elementRef.nativeElement.querySelector(
      '.mat-mdc-form-field-error-wrapper'
    );

    if (!$errorWrapper && this.matFormField._errorChildren.length === 0) {
      $errorWrapper = this.renderer2.createElement('div');
      $errorWrapper.classList.add('mat-mdc-form-field-error-wrapper');

      wrapper.appendChild($errorWrapper);
    }
    if ($errorWrapper) $errorWrapper.appendChild($matError);
  }

  private getErrorKey() {
    const keys = Object.keys(this.control?.errors ?? {});
    const length = keys.length - 1;
    const key = keys[length];
    return key;
  }
}
