import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Certificate } from '../models/Certificate';
import { User } from '../models/User';

import {AlertService} from 'ngx-alerts';

import { Observable } from 'rxjs/Observable';
@Injectable()
export class FirebaseService {



  certificateCollection : AngularFirestoreCollection<Certificate>;
  certificates : Observable<Certificate[]>;
  collectionName = 'Users';
  subCollectionName = 'Certificados';
  userDocument : AngularFirestoreDocument<User>;
  user : Observable<User>;
  


  constructor(
    public firebase: AngularFirestore,
    private alertService: AlertService) { }


  public getCertificates(cedula: string)
  {
    /*'Users' es el nombre de la collecion
    cedula es el número ingresado por parametro
    'Certificados' es la coleccion anidada de los certificados de los usuarios en la base de datos.
    La ruta siempre es: collection(id).documento(id).collection.....
    */
    this.certificateCollection = this.firebase.collection(this.collectionName).doc(cedula).collection(this.subCollectionName);

    //Se encarga de tomar el ID de los documentos en la base de datos.
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
    })
    return this.certificates;
  }




 public getUser(cedula: string)
 {
   //Se busca el usuario en la base de datos
   this.userDocument = this.firebase.collection(this.collectionName).doc(cedula);
   //Se encarga de tomar el ID de los documentos en la base de datos.
   this.user = this.userDocument.snapshotChanges().map(changes => {
     const data = changes.payload.data() as User;
     data.id = changes.payload.id;
     return data;
   })

   return this.user;
}

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
}
}

/**
    this.alertService.info('this is an info alert');
        this.alertService.danger('this is a danger alert');
        this.alertService.success('this is a success alert');
        this.alertService.warning('this is a warning alert');
         */