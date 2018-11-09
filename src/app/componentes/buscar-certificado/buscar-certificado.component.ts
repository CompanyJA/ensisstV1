import { FirebaseService } from './../../servicios/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Certificate } from '../../models/Certificate';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router/";
import { User } from '../../models/User';

// animacion de carga
import { NgxSpinnerService } from 'ngx-spinner';


const DIVIDE = 10000000;
@Component({
  selector: 'app-buscar-certificado',
  templateUrl: './buscar-certificado.component.html',
  styleUrls: ['./buscar-certificado.component.css']
})
export class BuscarCertificadoComponent implements OnInit {
  public certificates: Array<Certificate> = [];
  flag = false;
  certificateForm: FormGroup;
  correctoLogin: boolean;
  user: User = { id: '', firstName: '', lastName: '' };

  constructor(
    private searchService: FirebaseService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { this.construirFormulario(); }

  ngOnInit() {
  }

  public searchCertificates(cedula: string) {
    this.flag = true;
    this.searchService.getCertificatesById(cedula).subscribe(certificates => {
      this.certificates = [];
      certificates.forEach(certificate => {
        if (certificate.NivelCurso.toLocaleLowerCase() === 'coordinador') {
          this.certificates.push(certificate);
        } else {
          const auxDate = certificate.Fecha.split('/');
          const date = auxDate[1] + '/' + auxDate[0] + '/' + auxDate[2];
          const cerDate = new Date(date).valueOf() / DIVIDE;
          const actualDate = new Date(new Date()).valueOf() / DIVIDE;
          const result = actualDate - cerDate;

          if (result < 3154) {
            this.certificates.push(certificate);
          }
        }
      });
      //this.certificates = certificates;
      // detener spinner
      this.spinner.hide();
    });
  }

  public search() {
    this.spinner.show();

    const cedula = this.certificateForm.get('cedula').value;
    this.user.id = cedula;
    if (this.user.id !== '') {
      this.searchCertificates(cedula);
    }
    this.user.id = '';
    this.certificates = null;
  }

  construirFormulario() {
    this.correctoLogin = true;
    this.certificateForm = this.fb.group({
      cedula: ['', Validators.compose([Validators.required])],
    });
  }

}
