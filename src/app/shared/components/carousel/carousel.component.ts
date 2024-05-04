import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Router } from '@angular/router';
import { CAROUSEL } from '../../animations/carousel';

@Component({
  selector: 'carousel',
  standalone: true,
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
  imports: [CommonModule, MatButtonModule, MatIconModule],
  animations: [CAROUSEL],
})
export class CarouselComponent {
  @Input() images: string[] = [
    'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMTAzMDg4fHxlbnwwfHx8fHw%3D',
  ];
  @Input() width = '100%';
  @Input() height = '100%';
  @Input() objectFit: string = 'contain';
  @Input() hasOperators: boolean = true;
  router = inject(Router);
  currentSlide = 0;

  onPreviousClick() {
    const previous = this.currentSlide - 1;
    this.currentSlide = previous < 0 ? this.images.length - 1 : previous;
  }

  onNextClick() {
    const next = this.currentSlide + 1;
    this.currentSlide = next === this.images.length ? 0 : next;
  }
  get isProductPage() {
    return this.router.url === '/products';
  }
  get lengthGreaterThanOne() {
    if (this.images.length <= 1) {
      this.hasOperators = false;
    }
    return this.hasOperators;
  }
}
