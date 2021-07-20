import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './componentes/login/login.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { RegistroAdminHotelComponent } from './componentes/registro-admin-hotel/registro-admin-hotel.component';
import { PrincipalComponent } from './componentes/principal/principal.component';
import { HotelComponent } from './componentes/hotel/hotel.component';
import { HabitacionComponent } from './componentes/habitacion/habitacion.component';
import { ReservacionComponent } from './componentes/reservacion/reservacion.component';
import { AdminHotelComponent } from './componentes/admin-hotel/admin-hotel.component';
import { DisponiblesComponent } from './componentes/disponibles/disponibles.component';
import { FacturaComponent } from './componentes/factura/factura.component';
import { PerfilComponent } from './componentes/perfil/perfil.component';
import { AdminComponent } from './componentes/admin/admin.component';
import { UsuariosComponent } from './componentes/usuarios/usuarios.component';
import { GraficaComponent } from './componentes/grafica/grafica.component';
import { RegistroHotelComponent } from './componentes/registro-hotel/registro-hotel.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'registro', component: RegistroComponent},
  { path: 'registroAdminHotel', component: RegistroAdminHotelComponent},
  { path: 'principal', component: PrincipalComponent},
  { path: 'hotel/:idHotel', component: HotelComponent},
  { path: 'habitacion/:idHabitacion', component: HabitacionComponent},
  { path: 'reservacion', component: ReservacionComponent},
  { path: 'adminHotel' , component: AdminHotelComponent},
  { path: 'disponibles', component: DisponiblesComponent},
  { path: 'factura', component: FacturaComponent},
  { path: 'perfil', component: PerfilComponent},
  { path: 'admin', component: AdminComponent},
  { path: 'usuarios', component: UsuariosComponent},
  { path: 'grafica', component: GraficaComponent},
  { path: 'registroHotel', component: RegistroHotelComponent},
  { path: '**', component: LoginComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
