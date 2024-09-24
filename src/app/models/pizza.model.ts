import { Topping } from './topping.model';

export interface Pizza {
  size: string;
  price: number;
  toppings: Topping[];
  total: number;
  offer?: string;
}