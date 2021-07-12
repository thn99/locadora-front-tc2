import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardRentComponent } from './card-rent.component';

describe('CardRentComponent', () => {
  let component: CardRentComponent;
  let fixture: ComponentFixture<CardRentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardRentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardRentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
