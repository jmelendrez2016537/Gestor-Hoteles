import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Habitacion } from 'src/app/modelos/habitacion.model';
import { HabitacionService } from '../../servicios/habitacion.service';
import { UsuarioService } from '../../servicios/usuario.service';

@Component({
  selector: 'app-habitacion',
  templateUrl: './habitacion.component.html',
  styleUrls: ['./habitacion.component.scss'],
  providers: [HabitacionService, UsuarioService]
})
export class HabitacionComponent implements OnInit {
  public habitacionModel: Habitacion;
  public habitacionModelS;
  public token;
  public idHabitacionRuta: string;

  constructor(
    public _usuarioService: UsuarioService,
    public _habitacionService: HabitacionService,
    public _activatedRoute: ActivatedRoute

  ) {
    this.token = this._usuarioService.getToken();
    this.habitacionModel = new Habitacion(
      '','','','','','','',''
    );
   }

  ngOnInit(): void {
    this._activatedRoute.paramMap.subscribe((dataRuta) => {
      this.idHabitacionRuta = dataRuta.get('idHabitacion');
    });

    this.obtenerHabitacionId(this.idHabitacionRuta);
    this.serviciosHabitacion(this.idHabitacionRuta);
  }

  obtenerHabitacionId(idHabitacion){
    this._habitacionService.obtenerHabitacionId(this.token, idHabitacion).subscribe(
      (response) => {
        this.habitacionModel = response.habitacionEcontrada;
        console.log(response);
      }
    )
  }

  serviciosHabitacion(idHabitacion){
    this._habitacionService.serviciosHabitacion(this.token, idHabitacion).subscribe(
      (response) => {
        this.habitacionModelS = response.servicioEncontrado;
        console.log(response);
      }
    )
  }

}
