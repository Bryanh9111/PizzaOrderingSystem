import { Injectable } from '@angular/core';
import { Pizza } from '../../models/pizza.model';

@Injectable({
  providedIn: 'root'
})
export class OrderService {
  calculateTotal(pizza: Pizza): number {
    let total = pizza.price;
    pizza.toppings.forEach(topping => {
      total += topping.price;
    });
    return total;
  }
}
