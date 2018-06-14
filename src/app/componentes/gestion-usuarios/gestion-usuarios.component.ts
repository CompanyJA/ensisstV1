import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { ActivatedRoute, Router } from "@angular/router/";
import { FirebaseService } from './../../servicios/firebase.service';

@Component({
  selector: 'app-gestion-usuarios',
  templateUrl: './gestion-usuarios.component.html',
  styleUrls: ['./gestion-usuarios.component.css']
})
export class GestionUsuariosComponent implements OnInit {
  userAddForm: FormGroup;

  constructor(   
    private firebaseService:FirebaseService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { this.construirFormulario();}

  ngOnInit() {
  }



  construirFormulario() {
    this.userAddForm = this.fb.group({
      cedula: ['', Validators.compose([Validators.required]) ],
      nombres: ['', Validators.compose([Validators.required]) ],
      apellidos: ['', Validators.compose([Validators.required]) ]      
    });
  }

  public addUser(){
    let cedula = this.userAddForm.get('cedula').value;


  }
}
