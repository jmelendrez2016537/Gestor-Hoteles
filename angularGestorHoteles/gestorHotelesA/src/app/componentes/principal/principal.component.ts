import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Hotel } from 'src/app/modelos/hotel.model';
import { HotelService } from 'src/app/servicios/hotel.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-principal',
  templateUrl: './principal.component.html',
  styleUrls: ['./principal.component.scss'],
  providers: [HotelService, UsuarioService],
})
export class PrincipalComponent implements OnInit {
  public token;
  public hotelModelGet: Hotel;

  constructor(
  private _hotelService: HotelService,
  private _usuarioService: UsuarioService,
  private _router: Router
    ) {
      this.token = this._usuarioService.getToken();
      this.hotelModelGet = new Hotel(
        '',
        '',
        '',
        '',
        '',
        [{
          idEvento: ''
        }],
        [{
          idUsuario: ''
        }],
        ''
      )
    }

  ngOnInit(): void {
    this.listarHoteles();
  }

  listarHoteles() {
    this._hotelService.listarHoteles(this.token).subscribe(
      (response) => {
        this.hotelModelGet = response.hotelesEncontrados;
        console.log(response);

      },
      (error) => {
        console.log(<any>error);
      }
    );
  }



}
