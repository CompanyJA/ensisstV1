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

const APP_ROUTES: Routes =[
  {path: '', redirectTo : 'inicio', pathMatch : 'full'},
  {path : 'inicio', component : InicioComponent},
  {path: 'quienesSomos', component:QuienesSomosComponent},
  {path:'login', component:LoginComponent},
  {path: 'nuestrosServicios', component:NuestrosServiciosComponent},
  {path: 'contactenos', component:ContactenosComponent}

]





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    InicioComponent,
    QuienesSomosComponent,
    LoginComponent,
    NuestrosServiciosComponent,
    ContactenosComponent
  ],
  imports: [
    RouterModule.forRoot(APP_ROUTES),
    BrowserModule,   
    ReactiveFormsModule,
    HttpModule
       
  ],
  providers: [],
  bootstrap: [AppComponent,FooterComponent]
})
export class AppModule { }
