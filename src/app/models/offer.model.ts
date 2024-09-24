import { Order } from './order.model';

export interface Offer {
  description: string;
  details: string;
  condition: (order: Order) => boolean;
}