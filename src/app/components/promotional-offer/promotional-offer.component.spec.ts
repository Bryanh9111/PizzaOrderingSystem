import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PromotionalOfferComponent } from './promotional-offer.component';

describe('PromotionalOfferComponent', () => {
  let component: PromotionalOfferComponent;
  let fixture: ComponentFixture<PromotionalOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PromotionalOfferComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PromotionalOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
