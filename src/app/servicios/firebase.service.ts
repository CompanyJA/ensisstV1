import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Certificate } from '../models/Certificate';
import { AlertService } from 'ngx-alerts';

import { Observable } from 'rxjs/Observable';
@Injectable()
export class FirebaseService {
  certificateCollection: AngularFirestoreCollection<Certificate>;
  certificatesObservable: Observable<Certificate[]>;
  collectionName = 'Certificates';
  firstTime = true;

  constructor(
    private firebase: AngularFirestore,
    private alertService: AlertService) { }


  public getCertificatesById(cedula: string) {
    /*'Certificates' es el nombre de la collecion
    cedula es el número ingresado por parametro
    */
    this.certificateCollection = this.firebase.collection(this.collectionName, ref => ref.where('Cedula', '==', cedula));

    this.certificatesObservable = this.certificateCollection.valueChanges();

    /**Si se requiere tomar el id, las lineas de abajo estan correctas.
     *
    this.certificates = this.certificateCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(document => {
        const data = document.payload.doc.data() as Certificate;
        data.id = document.payload.doc.id;
        return data;
      });
    }));*/
    return this.certificatesObservable;
  }

  public getCertificatesByConsecutivo(consecutivo: string) {
    this.certificateCollection = this.firebase.collection(this.collectionName, ref => ref.where('Consecutivo', '==', consecutivo));

    this.certificatesObservable = this.certificateCollection.valueChanges();
    return this.certificatesObservable;
  }

  public addCertificate(certificate: Certificate) {
    this.firstTime = true;
    this.certificatesObservable = this.getCertificatesByConsecutivo(certificate.Consecutivo);

    this.certificatesObservable.subscribe(certificates => {
      if (certificates.length > 0) {
        if (this.firstTime) {
          console.log('No se puede insertar el certificado de consecutivo ' + certificate.Consecutivo + 
          ' porque ya existe en la base de datos');
          this.alertService.danger('No se puede insertar el certificado de consecutivo ' + certificate.Consecutivo + 
          ' porque ya existe en la base de datos');
        }
      } else {
        this.certificateCollection = this.firebase.collection(this.collectionName);
        console.log('El certificado fue ingresado correctamente');
        this.alertService.success('El certificado fue ingresado correctamente');
        this.firstTime = false;
        this.certificateCollection.add(certificate);
      }
    });
  }
}
