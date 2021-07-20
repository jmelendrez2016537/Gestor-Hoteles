import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './componentes/navbar/navbar.component';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { RegistroAdminHotelComponent } from './componentes/registro-admin-hotel/registro-admin-hotel.component';
import { HotelComponent } from './componentes/hotel/hotel.component';
import { HabitacionComponent } from './componentes/habitacion/habitacion.component';
import { ReservacionComponent } from './componentes/reservacion/reservacion.component';
import { AdminHotelComponent } from './componentes/admin-hotel/admin-hotel.component';
import { DisponiblesComponent } from './componentes/disponibles/disponibles.component';
import { FacturaComponent } from './componentes/factura/factura.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { RegistroHotelComponent } from './componentes/registro-hotel/registro-hotel.component';
import { GraficaComponent } from './componentes/grafica/grafica.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    RegistroComponent,
    PrincipalComponent,
    RegistroAdminHotelComponent,
    HotelComponent,
    HabitacionComponent,
    ReservacionComponent,
    AdminHotelComponent,
    DisponiblesComponent,
    FacturaComponent,
    PerfilComponent,
    AdminComponent,
    UsuariosComponent,
    RegistroHotelComponent,
    GraficaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CommonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
