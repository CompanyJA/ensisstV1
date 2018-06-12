import { Component, OnInit } from '@angular/core';
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
    private fb: FormBuilder,
//    public loginService:LoginService,
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

  public login(usuario:any){

    /*this.loginService.login(usuario).subscribe(
      rs=>{
        if(rs.VALIDADOLDAP){
          this.correctoLogin=true;
          this.router.navigate(['/Preguntas']);
          localStorage.setItem("usuario",this.usuario);
        }else{
          this.correctoLogin=false;        }                    
      },
      er =>{
      }
  );*/
  }



}
