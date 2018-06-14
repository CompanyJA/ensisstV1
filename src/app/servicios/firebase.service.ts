import { Injectable } from '@angular/core';
import { AngularFirestore,AngularFirestoreCollection,AngularFirestoreDocument } from 'angularfire2/firestore';
import { Certificate } from '../models/Certificate';

import { Observable } from 'rxjs/Observable';
@Injectable()
export class FirebaseService {



  certificateCollection : AngularFirestoreCollection<Certificate>;
  certificates : Observable<Certificate[]>;
  collectionName = 'Users';
  subCollectionName = 'Certificados';



  constructor(public firebase: AngularFirestore) { }


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


}






