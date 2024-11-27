import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakerGridComponent } from './breaker-grid.component';

describe('BreakerGridComponent', () => {
  let component: BreakerGridComponent;
  let fixture: ComponentFixture<BreakerGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakerGridComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakerGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
