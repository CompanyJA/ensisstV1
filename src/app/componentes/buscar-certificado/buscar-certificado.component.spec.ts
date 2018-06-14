import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BuscarCertificadoComponent } from './buscar-certificado.component';

describe('BuscarCertificadoComponent', () => {
  let component: BuscarCertificadoComponent;
  let fixture: ComponentFixture<BuscarCertificadoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BuscarCertificadoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BuscarCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
