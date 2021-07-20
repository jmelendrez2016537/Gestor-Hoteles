import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { GLOBAL } from './global.service';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class HabitacionService {
  public url: String;
  public headersVariable = new HttpHeaders().set(
    'Content-Type',
    'application/json'
  );
constructor(public _http: HttpClient) {
  this.url = GLOBAL.url;
}

obtenerHabitacionId(token, id: String): Observable<any> {
  let headersToken = this.headersVariable.set('Authorization', token);

  return this._http.get(this.url + '/listarHabitacionId/' + id, {
    headers: headersToken,
  })
}

serviciosHabitacion(token, id: String): Observable<any> {
  let headersToken = this.headersVariable.set('Authorization', token);

  return this._http.get(this.url + '/listarServicios/' + id, {
    headers: headersToken,
  })
}

}
