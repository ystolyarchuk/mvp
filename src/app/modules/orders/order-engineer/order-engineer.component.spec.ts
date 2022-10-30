import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderEngineerComponent } from './order-engineer.component';

describe('OrderEngineerComponent', () => {
  let component: OrderEngineerComponent;
  let fixture: ComponentFixture<OrderEngineerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ OrderEngineerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderEngineerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
