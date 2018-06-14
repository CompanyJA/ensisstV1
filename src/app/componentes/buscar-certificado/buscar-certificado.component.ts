import { FirebaseService } from './../../servicios/firebase.service';
import { Component, OnInit } from '@angular/core';
import { Certificate } from '../../models/Certificate';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ActivatedRoute, Router } from "@angular/router/";

@Component({
  selector: 'app-buscar-certificado',
  templateUrl: './buscar-certificado.component.html',
  styleUrls: ['./buscar-certificado.component.css']
})
export class BuscarCertificadoComponent implements OnInit {
  
  certificates : Certificate[];
  flag = false;
  certificateForm: FormGroup;
  

  constructor(private searchService:FirebaseService) { }

  ngOnInit() {

      this.searchCertificates("1017246338");
      console.log(this.certificates);
      console.log("holii");
      

  }

  public searchCertificates(cedula:string)
  {
    this.flag = true;
    this.searchService.getCertificates(cedula).subscribe(certificate =>
    {
      this.certificates = certificate;
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

}
