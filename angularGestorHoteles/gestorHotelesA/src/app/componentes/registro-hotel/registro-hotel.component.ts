import { Component, OnInit } from '@angular/core';
import { Hotel } from '../../modelos/hotel.model';
import { HotelService } from '../../servicios/hotel.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-registro-hotel',
  templateUrl: './registro-hotel.component.html',
  styleUrls: ['./registro-hotel.component.scss'],
  providers:  [HotelService, UsuarioService]
})
export class RegistroHotelComponent implements OnInit {
public hotelModel: Hotel;
public hotelModelB;
public hotelModelEd;
public hotelModelEl;
public token;
  constructor(
    public _hotelService: HotelService,
    public _usuarioService: UsuarioService
  ) {
    this.token = _usuarioService.getToken();
    this.hotelModel = new Hotel(
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

  }

  obtenerHotelId(idHotel ){
    this._hotelService.obtenerHotelId(this.token,idHotel ).subscribe(
      (response) => {
        this.hotelModelB = response.hotelEncontrado;
        console.log(response);
      }
    )
  }

  editarHotel(){
    this._hotelService.editarHotel(this.token,this.hotelModelB).subscribe(
      response => {
        console.log(response);
      }
    )
  }

  eliminarHotel(idHotel){
    this._hotelService.eliminarHotel(this.token,idHotel).subscribe(
      response => {
        console.log(response);
          }
    )
  }

  registrarHotel(){
    console.log(this.hotelModel)

    this._hotelService.registroHotel(this.token ,this.hotelModel).subscribe(
      response =>{
        console.log(response);
        this.hotelModelEd = response.hotelGuardado;
      },
      error =>{
      console.log(<any>error);

    }
    )
  }

}
