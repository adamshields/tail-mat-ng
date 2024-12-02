import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BreakerDialogComponent } from './breaker-dialog.component';

describe('BreakerDialogComponent', () => {
  let component: BreakerDialogComponent;
  let fixture: ComponentFixture<BreakerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BreakerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BreakerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
