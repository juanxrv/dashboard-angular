import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PedidosUsuarioComponent } from './pedidos-usuario.component';

describe('PedidosUsuarioComponent', () => {
  let component: PedidosUsuarioComponent;
  let fixture: ComponentFixture<PedidosUsuarioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PedidosUsuarioComponent]
    });
    fixture = TestBed.createComponent(PedidosUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
