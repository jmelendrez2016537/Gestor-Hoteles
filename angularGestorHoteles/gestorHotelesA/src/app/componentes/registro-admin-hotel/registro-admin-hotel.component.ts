import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-registro-admin-hotel',
  templateUrl: './registro-admin-hotel.component.html',
  styleUrls: ['./registro-admin-hotel.component.scss'],
  providers: [UsuarioService]
})
export class RegistroAdminHotelComponent implements OnInit {
  public adminHotel: Usuario;

  constructor(
    private _usuarioService: UsuarioService,
    private _router: Router) {
      this.adminHotel = new Usuario("","","","","","","");
     }

  ngOnInit(): void {
  }

  registrarAdminHotel(){
    console.log(this.adminHotel)

    this._usuarioService.registroAdminHotel(this.adminHotel).subscribe(
      response =>{
        console.log(response);
        this._router.navigate(['/login'])
      },
      error =>{
      console.log(<any>error);
    }
    )
  }

}
