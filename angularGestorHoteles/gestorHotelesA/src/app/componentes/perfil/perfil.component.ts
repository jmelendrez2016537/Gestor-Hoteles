import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Usuario } from '../../modelos/usuario.model';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  providers: [UsuarioService]
})
export class PerfilComponent implements OnInit {
  public usuarioModel;
  public usuarioModelEd;
  public usuarioModelEl
  public token;



  constructor(
    public _usuarioService: UsuarioService
  ) {
    this.token = _usuarioService.getToken();
    this.usuarioModelEd = new Usuario(
      '','','','','','',''
    );
   }

  ngOnInit(): void {
    this.obtenerUsuarioId();
  }


  obtenerUsuarioId(){
    this._usuarioService.obtenerUsuarioId().subscribe(
      (response) => {
        this.usuarioModel = response.usuarioEncontrado;
        console.log(response);
      }
    )
  }

  editarUsuario(){
    this._usuarioService.editarUsuario(this.usuarioModel).subscribe(
      response => {
        console.log(response);
        this.obtenerUsuarioId();
      }
    )
  }

  eliminarUsuario(idUsuario){
    this._usuarioService.eliminarUsuario(idUsuario).subscribe(
      response => {
        console.log(response);
        this.obtenerUsuarioId();
          }
    )
  }

}
