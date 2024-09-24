import { Pizza } from './pizza.model';

export interface Order {
  pizzas: Pizza[];
  grandTotal: number;
}