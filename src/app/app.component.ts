import { Component } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { PizzaComponent } from './components/pizza/pizza.component';
import { ToppingComponent } from './components/topping/topping.component';
import { OrderComponent } from './components/order/order.component';
import { PromotionalOfferComponent } from './components/promotional-offer/promotional-offer.component';
import { Topping } from './models/topping.model';
import { Pizza } from './models/pizza.model';
import { Order } from './models/order.model';
import { OfferService } from './services/offer/offer.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, PizzaComponent, ToppingComponent, OrderComponent, PromotionalOfferComponent],
  providers: [CurrencyPipe],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  selectedSize: { name: string, price: number } = { name: '', price: 0 };
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

  selectedToppings: { [key: string]: Topping[] } = {};
  orders: Pizza[] = [];
  grandTotal: number = 0;

  checkedToppings: { [key: string]: { [key: string]: boolean } } = {
    'Small': {}, 'Medium': {}, 'Large': {}, 'Extra Large': {}
  };

  constructor(private currencyPipe: CurrencyPipe, private offerService: OfferService) {
    this.initializeCheckedToppings();
  }

  initializeCheckedToppings() {
    const allToppings = [...this.vegToppings, ...this.nonVegToppings];
    ['Small', 'Medium', 'Large', 'Extra Large'].forEach(size => {
      allToppings.forEach(topping => {
        this.checkedToppings[size][topping.name] = false;
      });
    });
  }

  addToOrder() {
    this.offerService.resetOffers();

    for (let size in this.selectedToppings) {
      if (this.selectedToppings[size].length > 0) {
        const price = this.getPrice(size);
        const toppings = this.selectedToppings[size];
        const total = this.calculateTotal(price, toppings);
        
        const pizzaOrder: Pizza = {
          size,
          price,
          toppings,
          total
        };

        const order: Order = { pizzas: [pizzaOrder], grandTotal: total };
        const offerResult = this.offerService.applyOffers(order);
        
        if (offerResult.message !== 'No offer applied') {
          pizzaOrder.offer = offerResult.message;
          pizzaOrder.total = offerResult.newTotal;
        }

        this.orders.push(pizzaOrder);
        this.grandTotal += pizzaOrder.total;
      }
    }

    // Apply Offer 2 Logic (check for two medium pizzas with 4 toppings each)
    const fullOrder: Order = { pizzas: this.orders, grandTotal: this.grandTotal };
    const offer2Result = this.offerService.applyOfferTwo(fullOrder);
    if (offer2Result.message !== 'No offer applied') {
      const mediumPizzas = this.orders.filter(p => p.size === 'Medium' && p.toppings.length >= 4);
      mediumPizzas.slice(0, 2).forEach(pizza => {
        pizza.offer = offer2Result.message;
        pizza.total = offer2Result.newTotal / 2;
      });
      this.updateGrandTotal();
    }

    this.sortOrders();

    this.clearSelections();
  }

  calculateTotal(sizePrice: number, toppings: Topping[]): number {
    return sizePrice + toppings.reduce((acc, topping) => acc + topping.price, 0);
  }

  getPrice(size: string): number {
    switch (size) {
      case 'Small': return 5;
      case 'Medium': return 7;
      case 'Large': return 8;
      case 'Extra Large': return 9;
      default: return 0;
    }
  }

  toggleTopping(size: string, topping: Topping) {
    if (!this.selectedToppings[size]) {
      this.selectedToppings[size] = [];
    }

    const index = this.selectedToppings[size].findIndex(t => t.name === topping.name);
    if (index === -1) {
      this.selectedToppings[size].push(topping);
    } else {
      this.selectedToppings[size].splice(index, 1);
    }

    // Update checked state
    this.checkedToppings[size][topping.name] = !this.checkedToppings[size][topping.name];
  }

  clearSelections() {
    this.selectedToppings = {};
    this.selectedSize = { name: '', price: 0 };
    this.initializeCheckedToppings();
  }

  private updateGrandTotal() {
    this.grandTotal = this.orders.reduce((total, pizza) => total + pizza.total, 0);
  }

  onSizeSelected(size: { name: string, price: number }) {
    this.selectedSize = size;
  }

  onToppingsSelected(toppings: Topping[]) {
    if (this.selectedSize.name) {
      this.selectedToppings[this.selectedSize.name] = toppings;
    }
  }

  private sortOrders() {
    const sizeOrder = ['Small', 'Medium', 'Large', 'Extra Large'];
    this.orders.sort((a, b) => {
      // sort by size
      const sizeComparison = sizeOrder.indexOf(a.size) - sizeOrder.indexOf(b.size);
      if (sizeComparison !== 0) return sizeComparison;
      
      // if sizes are the same, sort by total price
      return a.total - b.total;
    });
  }
}