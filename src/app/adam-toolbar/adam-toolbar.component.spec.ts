import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdamToolbarComponent } from './adam-toolbar.component';

describe('AdamToolbarComponent', () => {
  let component: AdamToolbarComponent;
  let fixture: ComponentFixture<AdamToolbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdamToolbarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdamToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
