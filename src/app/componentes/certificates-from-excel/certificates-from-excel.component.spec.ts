import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CertificatesFromExcelComponent } from './certificates-from-excel.component';

describe('CertificatesFromExcelComponent', () => {
  let component: CertificatesFromExcelComponent;
  let fixture: ComponentFixture<CertificatesFromExcelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CertificatesFromExcelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CertificatesFromExcelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
