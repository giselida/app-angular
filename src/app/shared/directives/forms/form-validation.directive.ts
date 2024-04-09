import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { NgControl } from '@angular/forms';

@Directive({
  selector: '[formControl],[formControlName]',
  standalone: true,
})
export class FormValidationDirective implements OnInit {
  constructor(
    private elementRef: ElementRef,
    private renderer2: Renderer2,
    private controlRef: NgControl
  ) {}

  @Input() customErrors: { [key: string]: string } = {
    required: 'Este campo é obrigatório, Insira um valor',
    email: 'Por favor, insira um email válido',
    minlength:
      'Este campo deve conter no mínimo {{ actualLength }} / {{ requiredLength }} caracteres',
    maxlength:
      'Este campo deve conter no mínimo {{ actualLength }} / {{ requiredLength }} caracteres',
    name: 'O nome deve conter apenas letras',
    lastName: 'O sobrenome deve conter apenas letras',
    oneSpecialCharacter: 'A senha deve conter pelo menos um caractere especial',
    oneUpperCase: 'A senha deve conter pelo menos uma letra maiúscula',
    oneNumber: 'A senha deve conter pelo menos um numero',
  };

  ngOnInit(): void {
    const $input = this.elementRef.nativeElement.parentElement.parentElement
      .parentElement.parentElement as HTMLElement;

    let { $error, $matError } = this.createElements();

    this.controlRef.statusChanges?.subscribe(() => {
      const key = this.lastKey();
      const message = this.errorMessage(key);

      try {
        $error = this.renderer2.selectRootElement(`.${key}`);
        $error.innerText = message;
      } catch {
        $input.appendChild($matError);
        $matError.appendChild($error);
        $error.innerText = message;
      }
    });
  }
  private errorMessage(key: string): string {
    let message = this.customErrors[key] ?? '';
    const error = this.controlRef.errors?.[key];
    if (error) {
      Object.keys(error).forEach((param) => {
        message = message.replace(new RegExp(`{{ ${param} }}`), error[param]);
      });
    }
    return message;
  }
  private lastKey() {
    const keys = Object.keys(this.controlRef.errors ?? {});
    const key = keys[keys.length - 1];
    return key;
  }

  private createElements() {
    const $matError = this.renderer2.createElement('div') as HTMLElement;
    let $error = this.renderer2.createElement('p') as HTMLElement;
    const key = `${this.controlRef.name}-error`;
    $error.classList.add(key);
    $matError.classList.add('mat-erros');
    return { $error, $matError };
  }
}
