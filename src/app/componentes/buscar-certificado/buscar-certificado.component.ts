import { FirebaseService } from './../../servicios/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Certificate } from '../../models/Certificate';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router/";
import { User } from '../../models/User';

// animacion de carga
import { NgxSpinnerService } from 'ngx-spinner';



@Component({
  selector: 'app-buscar-certificado',
  templateUrl: './buscar-certificado.component.html',
  styleUrls: ['./buscar-certificado.component.css']
})
export class BuscarCertificadoComponent implements OnInit {
  
  certificates : Certificate[];
  flag = false;
  certificateForm: FormGroup;
  correctoLogin :boolean;
  user: User = {id: '', firstName: '', lastName: '' };
  userM = this.user;

  constructor(
    private searchService:FirebaseService,
    private fb: FormBuilder,
    private router: Router,
    private spinner: NgxSpinnerService
  ) { this.construirFormulario(); }

  ngOnInit() {

 
  



  }

  public searchCertificates(cedula:string)
  {
    this.flag = true;
    this.searchService.getCertificates(cedula).subscribe(certificate =>
    {
      this.certificates = certificate;
      // detener spinner
      this.spinner.hide();
     
      certificate.forEach(element => {
        if(element.courseName != 'Coordinador')
        {
          var date1 = new Date(element.expeditionDate).valueOf();
          var date2 = new Date(new Date()).valueOf();
          var result = date2 - date1;

          if(result > 31540000000)
          {
            element.flag = "Vencido";
          }
          else
          {
            element.flag = "Valido";
          }
        }
        else
        {
          element.flag = "Valido";
        }
      })
    });
  }


  public searchUser(cedula: string)
  {
    this.searchService.getUser(cedula).subscribe(users =>
    {
      this.userM = users;
    });
  }



  public search(){
    
    this.spinner.show();

    let cedula = this.certificateForm.get('cedula').value;
    this.user.id=cedula;
    if(this.user.id != '')
    {
    this.searchUser(this.user.id);    
    this.searchCertificates(cedula);
    }
    this.user.id= '';
    

    this.certificates= null;
    
    

  }


  construirFormulario() {
    this.correctoLogin=true;
    this.certificateForm = this.fb.group({
      cedula: ['', Validators.compose([Validators.required]) ],
    });
  }

}
