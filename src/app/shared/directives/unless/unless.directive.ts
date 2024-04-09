import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';
@Directive({
  selector: '[unless]',
  standalone: true,
})
export class UnlessDirective {
  private hasView = false;
  constructor(
    private templateRef: TemplateRef<any>,
    private containerRef: ViewContainerRef
  ) {}

  @Input() set unless(condition: boolean) {
    if (!condition && !this.hasView) {
      this.containerRef.createEmbeddedView(this.templateRef);
      this.hasView = true;
    } else if (condition && this.hasView) {
      this.containerRef.clear();
      this.hasView = false;
    }
  }
}
