import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {Routes, RouterModule, CanActivate } from '@angular/router';
import { HttpModule } from '@angular/http';
import {ReactiveFormsModule} from '@angular/forms';


import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { InicioComponent } from './componentes/inicio/inicio.component';
import { QuienesSomosComponent } from './componentes/quienes-somos/quienes-somos.component';
import { LoginComponent } from './componentes/login/login.component';
import { NuestrosServiciosComponent } from './componentes/nuestros-servicios/nuestros-servicios.component';
import { ContactenosComponent } from './componentes/contactenos/contactenos.component';
import { AdminComponent } from './componentes/admin/admin.component';

//libreria de terceros
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { AlertModule } from 'ngx-alerts';


// Guardian de rutas
import {AuthGuard} from './guard/auth.guard';


const APP_ROUTES: Routes =[
  {path: '', redirectTo : 'quienesSomos', pathMatch : 'full'},
  {path : 'consultar', component : InicioComponent},
  {path: 'quienesSomos', component:QuienesSomosComponent},
  {path:'login', component:LoginComponent},
  {path: 'nuestrosServicios', component:NuestrosServiciosComponent},
  {path: 'contactenos', component:ContactenosComponent},
  {path: 'admin', component:AdminComponent, canActivate:[AuthGuard]},
  {path: '**', component:QuienesSomosComponent}

]

// Servicios
import { FirebaseService } from './servicios/firebase.service';
import { AuthService } from './servicios/auth.service';


//Animaciones 
import { NgxSpinnerModule } from 'ngx-spinner';


//Firebase
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { BuscarCertificadoComponent } from './componentes/buscar-certificado/buscar-certificado.component';
import {AngularFireAuthModule} from 'angularfire2/auth';
import { CertificatesFromExcelComponent } from './componentes/certificates-from-excel/certificates-from-excel.component';

//Excel 
import { HotTableModule } from '@handsontable/angular';
import { AddCertificatesComponent } from './componentes/add-certificates/add-certificates.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    QuienesSomosComponent,
    LoginComponent,
    NuestrosServiciosComponent,
    ContactenosComponent,
    BuscarCertificadoComponent,
    AdminComponent,
    CertificatesFromExcelComponent,
    AddCertificatesComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule, 
    HotTableModule.forRoot(),
    AlertModule.forRoot({maxMessages: 3, timeout: 3000}),
    AngularFireModule,
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase, 'angularfs'),     
    RouterModule.forRoot(APP_ROUTES),  
    ReactiveFormsModule,
    HttpModule,
    NgxSpinnerModule
    
  ],
  providers: [FirebaseService, AuthService,AuthGuard],
  bootstrap: [AppComponent,NavbarComponent, FooterComponent]
})
export class AppModule { }
