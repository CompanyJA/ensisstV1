import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../servicios/auth.service';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router/";



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  correctoLogin :boolean;
  public  usuario;
  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router


  ) { this.construirFormulario(); }

  ngOnInit() {
  



  }


  construirFormulario() {
    this.correctoLogin=true;
    this.loginForm = this.fb.group({
      usuario: ['', Validators.compose([Validators.required,Validators.minLength(3)])],
      clave: ['', Validators.compose([Validators.required]) ],
    });
  }


  submit() {
    this.usuario = this.loginForm.get('usuario').value;
    const clave = this.loginForm.get('clave').value;      
    this.login(this.loginForm.getRawValue());
  }

  public login(credenciales:any){
    this.authService.loginEmail(credenciales.usuario,credenciales.clave)
    .then( (res) => {
      this.router.navigate(['/admin']);
    }).catch((err) => {
      this.usuario=null;
      this.router.navigate(['/login']);
    });
  }

  /*
  

  this.authService.registerUser(usuario.usuario,usuario.clave).then( (res) =>{
    console.log(res);    
  }).catch( (err)=>{
    console.log(err);    
  });

  
  
  */


}
