import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Topping } from '../../models/topping.model';

@Component({
  selector: 'app-topping',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './topping.component.html',
  styleUrls: ['./topping.component.css']
})
export class ToppingComponent {
  @Output() toppingSelected = new EventEmitter<Topping[]>();

  vegToppings: Topping[] = [
    { name: 'Tomatoes', price: 1.00, type: 'Veg' },
    { name: 'Onions', price: 0.50, type: 'Veg' },
    { name: 'Bell pepper', price: 1.00, type: 'Veg' },
    { name: 'Mushrooms', price: 1.20, type: 'Veg' },
    { name: 'Pineapple', price: 0.75, type: 'Veg' }
  ];

  nonVegToppings: Topping[] = [
    { name: 'Sausage', price: 1.00, type: 'NonVeg' },
    { name: 'Pepperoni', price: 2.00, type: 'NonVeg' },
    { name: 'Barbecue chicken', price: 3.00, type: 'NonVeg' }
  ];

  selectedToppings: Topping[] = [];

  toggleTopping(topping: Topping) {
    const index = this.selectedToppings.findIndex(t => t.name === topping.name);
    if (index === -1) {
      this.selectedToppings.push(topping);
    } else {
      this.selectedToppings.splice(index, 1);
    }
    this.toppingSelected.emit(this.selectedToppings);
  }

  isToppingSelected(topping: Topping): boolean {
    return this.selectedToppings.some(t => t.name === topping.name);
  }

  clearToppings() {
    this.selectedToppings = [];
    this.toppingSelected.emit(this.selectedToppings);
  }
}