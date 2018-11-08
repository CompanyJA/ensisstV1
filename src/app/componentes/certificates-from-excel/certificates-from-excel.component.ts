import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { NgxSpinnerService } from 'ngx-spinner';

import {AlertService} from 'ngx-alerts';


@Component({
  selector: 'app-certificates-from-excel',
  templateUrl: './certificates-from-excel.component.html',
  styleUrls: ['./certificates-from-excel.component.css']
})
export class CertificatesFromExcelComponent implements OnInit {

  arrayBuffer:any;
  file:File;


  constructor(
    private spinner: NgxSpinnerService,
    private alertService: AlertService

  ) { 

    
  }

  ngOnInit() {
  }
  incomingfile(event){
    this.file= event.target.files[0]; 
  }

  Upload() {
       this.spinner.show();
        let fileReader = new FileReader();
          fileReader.onload = (e) => {
              this.arrayBuffer = fileReader.result;
              var data = new Uint8Array(this.arrayBuffer);
              var arr = new Array();
              for(var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
              var bstr = arr.join("");
              var workbook = XLSX.read(bstr, {type:"binary"});
              var first_sheet_name = workbook.SheetNames[0];
              var worksheet = workbook.Sheets[first_sheet_name];
              this.alertService.success('Archivo cargado con exito!');
              this.spinner.hide();

              var datos=XLSX.utils.sheet_to_json(worksheet,{raw:true});
              console.log(datos[2])
              
          }
          fileReader.readAsArrayBuffer(this.file);
  }


}
