import { Injectable } from '@angular/core';
import { Pizza } from '../../models/pizza.model';
import { Order } from '../../models/order.model';
import { Topping } from '../../models/topping.model';

interface OfferResult {
  message: string;
  newTotal: number;
}

@Injectable({
  providedIn: 'root'
})
export class OfferService {
  private appliedOffers: Set<string> = new Set();

  applyOffers(order: Order): OfferResult {
    let result: OfferResult = { message: 'No offer applied', newTotal: order.grandTotal };

    if (order.pizzas.length === 1) {
      const pizza = order.pizzas[0];

      const offerOneResult = this.applyOfferOne(pizza);
      if (offerOneResult) {
        return offerOneResult;
      }

      const offerThreeResult = this.applyOfferThree(pizza);
      if (offerThreeResult) {
        return offerThreeResult;
      }
    }

    return result;
  }

  private applyOfferOne(pizza: Pizza): OfferResult | null {
    if (!this.appliedOffers.has('Offer1') && pizza.size === 'Medium' && pizza.toppings.length === 2) {
      this.appliedOffers.add('Offer1');
      return { 
        message: 'Offer 1 Applied: 1 Medium Pizza with 2 toppings = $5', 
        newTotal: 5 
      };
    }
    return null;
  }

  private applyOfferThree(pizza: Pizza): OfferResult | null {
    if (!this.appliedOffers.has('Offer3') && pizza.size === 'Large') {
      const effectiveToppingCount = this.calculateEffectiveToppingCount(pizza.toppings);
      
      if (effectiveToppingCount === 4) {
        this.appliedOffers.add('Offer3');
        return { 
          message: 'Offer 3 Applied: 1 Large Pizza with 4 toppings (50% discount)', 
          newTotal: pizza.total / 2 
        };
      }
    }
    return null;
  }

  private calculateEffectiveToppingCount(toppings: Topping[]): number {
    return toppings.reduce((count, topping) => {
      if (topping.name === 'Pepperoni' || topping.name === 'Barbecue chicken') {
        return count + 2;
      }
      return count + 1;
    }, 0);
  }

  applyOfferTwo(order: Order): OfferResult {
    if (this.appliedOffers.has('Offer2')) {
      return { message: 'No offer applied', newTotal: order.grandTotal };
    }

    const mediumPizzas = order.pizzas.filter(pizza => pizza.size === 'Medium');
    if (mediumPizzas.length >= 2) {
      let validPizzas = mediumPizzas.filter(pizza => pizza.toppings.length === 4);
      if (validPizzas.length >= 2) {
        this.appliedOffers.add('Offer2');
        return { 
          message: 'Offer 2 Applied: 2 Medium Pizzas with 4 toppings each = $9', 
          newTotal: 9 
        };
      }
    }
    return { message: 'No offer applied', newTotal: order.grandTotal };
  }

  resetOffers() {
    this.appliedOffers.clear();
  }
}