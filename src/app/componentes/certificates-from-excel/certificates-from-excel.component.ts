import { Component, OnInit } from '@angular/core';
import * as XLSX from 'ts-xlsx';
import { NgxSpinnerService } from 'ngx-spinner';

import { AlertService } from 'ngx-alerts';
import { FirebaseService } from '../../servicios/firebase.service'

import * as Handsontable from 'handsontable';
import { Certificate } from '../../models/Certificate';

@Component({
  selector: 'app-certificates-from-excel',
  templateUrl: './certificates-from-excel.component.html',
  styleUrls: ['./certificates-from-excel.component.css']
})
export class CertificatesFromExcelComponent implements OnInit {

  arrayBuffer: any;
  file: File;
  dataset = [];
  isLoaded = false;
  certificates: Array<Certificate>;

  settingsObj = {
    rowHeaders: true,
    colHeaders: ["Consecutivo", "Nombres", "Cedula", "NivelCurso", "Fecha"],
  };



  constructor(
    private spinner: NgxSpinnerService,
    private alertService: AlertService,
    private firebase: FirebaseService

  ) { }

  ngOnInit() {
  }


  incomingfile(event) {
    this.file = event.target.files[0];
  }

  Upload() {
    this.spinner.show();
    let fileReader = new FileReader();
    fileReader.onload = (e) => {
      this.arrayBuffer = fileReader.result;
      var data = new Uint8Array(this.arrayBuffer);
      var arr = new Array();
      for (var i = 0; i != data.length; ++i) arr[i] = String.fromCharCode(data[i]);
      var bstr = arr.join("");
      var workbook = XLSX.read(bstr, { type: "binary" });
      var first_sheet_name = workbook.SheetNames[0];
      var worksheet = workbook.Sheets[first_sheet_name];
      this.alertService.success('Archivo cargado con exito!');
      this.spinner.hide();

      var datos = XLSX.utils.sheet_to_json(worksheet, { raw: true });
      this.dataset = datos;
      this.isLoaded = true;
      // configuración tabla en excel que se carga

      //console.log(datos[1])

    }
    fileReader.readAsArrayBuffer(this.file);
  }

  insertData() {

    this.certificates = [];
    this.dataset.forEach(value => {
      const certificate = {
        Consecutivo: '',
        Cedula: '',
        Fecha: '',
        NivelCurso: '',
        Nombres: ''
      };
      certificate.Consecutivo = value.Consecutivo + '';
      certificate.Cedula = value.Cedula + '';
      certificate.Fecha = value.Fecha;
      certificate.NivelCurso = value.NivelCurso;
      certificate.Nombres = value.Nombres;
      this.certificates.push(certificate);
    });

    this.certificates.forEach(certificate => {
      this.firebase.addCertificate(certificate);
    });

  }


}
