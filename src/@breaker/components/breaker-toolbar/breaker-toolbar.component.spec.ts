import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakerToolbarComponent } from './breaker-toolbar.component';

describe('BreakerToolbarComponent', () => {
  let component: BreakerToolbarComponent;
  let fixture: ComponentFixture<BreakerToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakerToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakerToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
