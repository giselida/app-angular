import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-transaction',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `<h1>hello word</h1>`,
  styleUrl: './transaction.component.scss',
})
export class TransactionComponent {}
