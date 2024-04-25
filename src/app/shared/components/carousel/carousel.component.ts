import { CommonModule } from '@angular/common';
import { Component, inject, Input, OnInit } from '@angular/core';
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
export class CarouselComponent implements OnInit {
  @Input() images: string[] = [
    'https://images.unsplash.com/photo-1567653418876-5bb0e566e1c2?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMTAzMDg4fHxlbnwwfHx8fHw%3D',
    'https://images.unsplash.com/photo-1566864222010-d45675442c31?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MnwxMTAzMDg4fHxlbnwwfHx8fHw%3D',
    'https://images.unsplash.com/photo-1551410224-699683e15636?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8M3wxMTAzMDg4fHxlbnwwfHx8fHw%3D',
    'https://images.unsplash.com/photo-1565622871630-8e453c4b6ed9?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8N3wxMTAzMDg4fHxlbnwwfHx8fHw%3D',
    'https://images.unsplash.com/photo-1537800534001-f3e01aa1c34c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8NXwxMTAzMDg4fHxlbnwwfHx8fHw%3D',
  ];
  @Input() hasOperators: boolean = true;
  router = inject(Router);
  currentSlide = 0;

  ngOnInit(): void {
    console.log(this.lengthGreaterThanOne);
  }
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
