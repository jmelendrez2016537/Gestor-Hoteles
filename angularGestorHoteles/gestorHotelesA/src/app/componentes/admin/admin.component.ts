import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService } from '../../servicios/usuario.service';



@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [UsuarioService]
})
export class AdminComponent implements OnInit {
  public adminModel;
public token;

  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.token = _usuarioService.getToken();
    this.adminModel = new Usuario(
      '','','','','','',''
    )
   }


  ngOnInit(): void {
    this.obtenerAdminId();
  }

obtenerAdminId(){
  this._usuarioService.obtenerAdminId().subscribe(
    (response) => {
      this.adminModel = response.adminEncontrado;
      console.log(response);
    }
  )
}

}
