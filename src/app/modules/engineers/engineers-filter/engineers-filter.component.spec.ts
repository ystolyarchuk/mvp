import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngineersFilterComponent } from './engineers-filter.component';

describe('EngineersFilterComponent', () => {
  let component: EngineersFilterComponent;
  let fixture: ComponentFixture<EngineersFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngineersFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngineersFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
