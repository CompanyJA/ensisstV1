import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Certificate } from '../models/Certificate';
import { User } from '../models/User';
import { map } from 'rxjs/operators';
import { AlertService } from 'ngx-alerts';

import { Observable } from 'rxjs/Observable';
@Injectable()
export class FirebaseService {



  certificateCollection: AngularFirestoreCollection<Certificate>;
  certificates: Observable<Certificate[]>;
  otherCertificates: Observable<any[]>;
  otherCollections: AngularFirestoreCollection<any>;
  collectionName = 'Users';
  subCollectionName = 'Certificados';
  otherCollection = 'Certificates';
  userDocument: AngularFirestoreDocument<User>;
  user: Observable<User>;



  constructor(
    public firebase: AngularFirestore,
    private alertService: AlertService) { }


  public getCertificates(cedula: string) {
    /*'Users' es el nombre de la collecion
    cedula es el número ingresado por parametro
    'Certificados' es la coleccion anidada de los certificados de los usuarios en la base de datos.
    La ruta siempre es: collection(id).documento(id).collection.....
    */
    this.certificateCollection = this.firebase.collection(this.collectionName).doc(cedula).collection(this.subCollectionName);

    // Se encarga de tomar el ID de los documentos en la base de datos.

    this.certificates = this.certificateCollection.snapshotChanges().pipe(map(changes => {
      return changes.map(document => {
        const data = document.payload.doc.data() as Certificate;
        data.id = document.payload.doc.id;
        return data;
      });
    }));
    /*
    this.certificates = this.certificateCollection.snapshotChanges().map(changes =>
    {
      return changes.map(a=>
      {
        //Hace un tipo de casting para darle forma a los Observable, es decir, convierte el Observable a una interfaz.
        const data = a.payload.doc.data() as Certificate;
        //Se toma el ID del documento.
        data.id = a.payload.doc.id;
        return data;
      })
    })*/
    return this.certificates;
  }




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
    })*/

    return this.user;
  }

  public addUser(user: User) {
    let data = {
      firstName: user.firstName,
      lastName: user.lastName,
    }

    this.firebase.collection(this.collectionName).doc(user.id).set(data).then((data) => {
      this.alertService.success('Usuario registrado con éxito.');
    }).catch((error) => {
      this.alertService.danger('No se puede guardar el usuario ' + error);
      return false;
    });
  }

  public getCertificate(cedula: string) {
    this.otherCollections = this.firebase.collection('Cetificates', ref => ref.where('Cedula', '==', cedula));
    this.otherCertificates =  this.otherCollections.valueChanges();
    return this.otherCertificates;
  }
}

/**
    this.alertService.info('this is an info alert');
        this.alertService.danger('this is a danger alert');
        this.alertService.success('this is a success alert');
        this.alertService.warning('this is a warning alert');
         */