import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EtlComponent } from './etl.component';

describe('EtlComponent', () => {
  let component: EtlComponent;
  let fixture: ComponentFixture<EtlComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EtlComponent]
    });
    fixture = TestBed.createComponent(EtlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
