import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Offer } from '../../models/offer.model';

@Component({
  selector: 'app-promotional-offer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './promotional-offer.component.html',
  styleUrls: ['./promotional-offer.component.css']
})
export class PromotionalOfferComponent {
  @Input() offers: Offer[] = [];
}
