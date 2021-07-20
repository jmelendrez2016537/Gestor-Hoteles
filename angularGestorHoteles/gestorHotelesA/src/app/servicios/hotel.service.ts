import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';
import { Hotel } from '../modelos/hotel.model';


@Injectable({
  providedIn: 'root',
})
export class HotelService {
  public url: String;
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
constructor(public _http: HttpClient) {
  this.url = GLOBAL.url;
}

listarHoteles(token): Observable<any> {
  let headersToken = this.headersVariable.set('Authorization', token);

  return this._http.get(this.url + '/listarHoteles', {
    headers: headersToken
  })
}

obtenerHotelId(token, id: String): Observable<any> {
  let headersToken = this.headersVariable.set('Authorization', token);

  return this._http.get(this.url + '/listarHotelID/' + id, {
    headers: headersToken,
  })
}

registroHotel(token, hotel): Observable<any> {
  let headersToken = this.headersVariable.set('Authorization', token);
  let params = JSON.stringify(hotel);

  return this._http.post(this.url + '/registrarHotel', params, {headers: headersToken})
}

editarHotel(token, hotel: Hotel): Observable<any> {
  let params = JSON.stringify(hotel);
  let headersToken = this.headersVariable.set('Authorization', token);

  return this._http.put(this.url + '/editarHotel/' + hotel._id, params, {headers: headersToken})
}

eliminarHotel(token, id:String): Observable<any> {
  let headersToken = this.headersVariable.set('Authorization', token);

  return this._http.delete(this.url + '/eliminarHotel/' + id, {headers: headersToken})
}

habitacionesHotel(token, id: String): Observable<any> {
  let headersToken = this.headersVariable.set('Authorization', token);

  return this._http.get(this.url + '/listarHabitacionesHotel/' + id , {
    headers: headersToken,
  })
}

eventosHotel(token, id: String): Observable<any> {
  let headersToken = this.headersVariable.set('Authorization', token);

  return this._http.get(this.url + '/listarEventosHotel/' + id,{
    headers: headersToken,
  })
}

}
