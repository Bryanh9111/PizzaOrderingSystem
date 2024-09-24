import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Topping } from '../../models/topping.model';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {
  @Input() selectedSize: { name: string, price: number } = { name: '', price: 0 };
  @Input() selectedToppings: Topping[] = [];
  @Input() total: number = 0;
  @Input() offer: string = '';
}
