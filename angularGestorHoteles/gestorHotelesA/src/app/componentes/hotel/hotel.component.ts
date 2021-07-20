import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Hotel } from 'src/app/modelos/hotel.model';
import { HotelService } from '../../servicios/hotel.service';
import { UsuarioService } from '../../servicios/usuario.service';
import { Habitacion } from '../../modelos/habitacion.model';

@Component({
  selector: 'app-hotel',
  templateUrl: './hotel.component.html',
  styleUrls: ['./hotel.component.scss'],
  providers: [HotelService, UsuarioService]
})
export class HotelComponent implements OnInit {
  public hotelModel;
  public hotelModelH;
  public hotelModelE;
  public token;
  public idHotelRuta: string;

  constructor(
    public _usuarioService: UsuarioService,
    public _hotelService: HotelService,
    public _activatedRoute: ActivatedRoute
  ) {
    this.token = this._usuarioService.getToken();
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
    );

  }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idHotelRuta = dataRuta.get('idHotel');
    });
    this.obtenerHotelId(this.idHotelRuta);
    this.habitacionesHotel(this.idHotelRuta);
    this.eventosHotel(this.idHotelRuta);
  }

  obtenerHotelId(idHotel){
    this._hotelService.obtenerHotelId(this.token, idHotel).subscribe(
      (response) => {
        this.hotelModel = response.hotelEncontrado;
        console.log(response);
      }
    )
  }

  habitacionesHotel(idHotel){
    this._hotelService.habitacionesHotel(this.token, idHotel).subscribe(
      (response) => {
        this.hotelModelH = response.habitacionesHotelEncontradas;
        console.log(response);
      }
    )
  }

  eventosHotel(idHotel){
    this._hotelService.eventosHotel(this.token, idHotel).subscribe(
      (response) => {
        this.hotelModelE = response.eventosHotelesEncontrados;
        console.log(response);
      }
    )
  }


}
