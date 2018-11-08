import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Certificate } from '../models/Certificate';
import {AlertService} from 'ngx-alerts';

import { Observable } from 'rxjs/Observable';
@Injectable()
export class FirebaseService {
  certificateCollection: AngularFirestoreCollection<Certificate>;
  certificatesObservable: Observable<Certificate[]>;
  collectionName = 'Certificates';

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
    this.certificatesObservable = this.getCertificatesByConsecutivo(certificate.Consecutivo);

    this.certificatesObservable.subscribe(certificates => {
      if (certificates.length > 0) {
        this.alertService.danger('No se puede insertar el certificado de consecutivo ' + certificate.Consecutivo);
       } else {
         this.certificateCollection = this.firebase.collection(this.collectionName);
         this.certificateCollection.add(certificate);
       }
    });
  }
/*
 public getUser(cedula: string) {
   // Se busca el usuario en la base de datos
   this.userDocument = this.firebase.collection(this.collectionName).doc(cedula);
   // Se encarga de tomar el ID de los documentos en la base de datos.

   this.user = this.userDocument.snapshotChanges().pipe(map(changes => {
     const data = changes.payload.data() as User;
     data.id = changes.payload.id;
     return data;
   }));
   /*
   this.user = this.userDocument.snapshotChanges().map(changes => {
     const data = changes.payload.data() as User;
     data.id = changes.payload.id;
     return data;
   })

   return this.user;
}*/
/*
public addUser(user: User)
{
  var data = {
    firstName: user.firstName,
    lastName: user.lastName,
  }

  this.firebase.collection(this.collectionName).doc(user.id).set(data).then( (data) =>
  {
    this.alertService.success('Usuario registrado con éxito.');
  }).catch( (error) =>{
    this.alertService.danger('No se puede guardar el usuario ' + error);
    return false;
  });
}*/
}

/**
    this.alertService.info('this is an info alert');
        this.alertService.danger('this is a danger alert');
        this.alertService.success('this is a success alert');
        this.alertService.warning('this is a warning alert');
         */