import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router/";
import {AuthService } from '../../servicios/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  public isLogin: boolean;
  public nombreUsuario: string;

  certificateForm: FormGroup;
  correctoLogin :boolean;
  



  constructor(
    public authService: AuthService,
    private fb: FormBuilder,
    private router: Router
  ) { this.construirFormulario();}

  ngOnInit() {
    this.authService.getAuth().subscribe( auth => {
      if (auth) {
        this.isLogin = true;
        this.nombreUsuario = auth.displayName;
      } else {
        this.isLogin = false;
      }
    });
  }

 
  submit() {
    console.log("cedula"+ this.certificateForm.get('cedula').value);
    
    
    /* this.usuario = this.loginForm.get('usuario').value;
    const clave = this.loginForm.get('clave').value;      
    this.login(this.loginForm.getRawValue());*/
  }

  construirFormulario() {
    this.correctoLogin=true;
    this.certificateForm = this.fb.group({
      cedula: ['', Validators.compose([Validators.required]) ],
    });
  }



  onClickLogout() {
    this.authService.logout();
  }


}
