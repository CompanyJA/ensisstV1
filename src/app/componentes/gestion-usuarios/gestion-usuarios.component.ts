import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from '@angular/router/';
import { FirebaseService } from './../../servicios/firebase.service';

//Alertas
import { Certificate } from '../../models/Certificate';
@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  userAddForm: FormGroup;
  certificate: Certificate = {
    Consecutivo: '',
    Nombres: '',
    Cedula: '',
    NivelCurso: '',
    Fecha: '',
  };
  constructor(
    private firebaseService: FirebaseService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService ) { this.construirFormulario(); }

  ngOnInit() {
  }

  construirFormulario() {
    this.userAddForm = this.fb.group({
      Consecutivo: ['', Validators.compose([Validators.required]) ],
      Nombres: ['', Validators.compose([Validators.required]) ],
      Cedula: ['', Validators.compose([Validators.required]) ],
      NivelCurso: ['', Validators.compose([Validators.required]) ],
      Fecha: ['', Validators.compose([Validators.required]) ]
    });
  }

  public addUser() {
    const cedula = this.userAddForm.get('Cedula').value;
    const nombres = this.userAddForm.get('Nombres').value;
    const consecutivo = this.userAddForm.get('Consecutivo').value;
    const fecha = this.userAddForm.get('Fecha').value + '';
    const date = fecha.split('-');
    const validDate = date[2] + '/' + date[1] + '/' + date[0];
    const nivelCurso = this.userAddForm.get('NivelCurso').value;

    this.certificate.Consecutivo = consecutivo;
    this.certificate.Nombres = nombres;
    this.certificate.Cedula = cedula + '';
    this.certificate.NivelCurso = nivelCurso;
    this.certificate.Fecha = validDate;

    this.firebaseService.addCertificate(this.certificate);

    /*this.certificate.Nombres = '';
    this.certificate.Cedula = '';
    this.certificate.Consecutivo = '';
    this.certificate.Fecha = '';
    this.certificate.NivelCurso = '';*/
  }
}

