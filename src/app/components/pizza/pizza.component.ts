import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pizza',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pizza.component.html',
  styleUrls: ['./pizza.component.css']
})
export class PizzaComponent {
  @Output() sizeSelected = new EventEmitter<{ name: string, price: number }>();

  pizzaSizes = [
    { name: 'Small', price: 5 },
    { name: 'Medium', price: 7 },
    { name: 'Large', price: 8 },
    { name: 'Extra Large', price: 9 }
  ];

  selectedSize: { name: string, price: number } = { name: '', price: 0 };

  selectSize(size: { name: string, price: number }) {
    this.selectedSize = size;
    this.sizeSelected.emit(this.selectedSize);
  }

  clearSize() {
    this.selectedSize = { name: '', price: 0 };
    this.sizeSelected.emit(this.selectedSize);
  }
}