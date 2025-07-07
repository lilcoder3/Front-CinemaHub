import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Function } from '../models/Functions';
import { HttpClient } from '@angular/common/http';
import { QuantityFunctionsCinemaDTO } from '../models/QuantityFunctionsCinemaDTO';
import { QuantityFunctionsUserDateDTO } from '../models/QuantityFunctionsUserDateDTO';
import { QuantityFunctionsUsersDTO } from '../models/QuantityFunctionsUsersDTO';
import { QuantityTicketsCinemaDTO } from '../models/QuantityTicketsCinemaDTO';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class FunctionService {
  private url = `${base_url}/functions`
  private urlinsert = `${base_url}/functions/Registro`
  private listaCambio = new Subject<Function[]>();
  constructor(private http:HttpClient) { }

  list(){
      return this.http.get<Function[]>(this.url)
  }
  insert(r: Function): Observable<Function> {
    return this.http.post<Function>(this.urlinsert, r);
  }
  setList(listaNueva: Function[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Function>(`${this.url}/${id}`);
  }
  update(r: Function, id:number) {
    return this.http.put(`${this.url}/${id}`, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

  listByUser(userId: number) {
    return this.http.get<Function[]>(`${this.url}/byUser?userId=${userId}`);
  }

  getFunctionsByUserAndDate(username: string): Observable<QuantityFunctionsUserDateDTO[]> {
  return this.http.get<QuantityFunctionsUserDateDTO[]>(`${this.url}/funcionesPorUsuarioFecha?username=${username}`);
  }

  getQuantityFunctionsByUser(): Observable<QuantityFunctionsUsersDTO[]> {
    return this.http.get<QuantityFunctionsUsersDTO[]>(`${this.url}/cantidadFuncionesUsuario`);
  }

  getQuantityTicketsByCinema(): Observable<QuantityTicketsCinemaDTO[]> {
    return this.http.get<QuantityTicketsCinemaDTO[]>(`${this.url}/ticketsVendidosPorCine`);
  }

}
