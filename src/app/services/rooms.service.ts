import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { Rooms } from '../models/Rooms';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class RoomsService {
  private url = `${base_url}/rooms`
  private urlinsert = `${base_url}/rooms/Registro`
  private listaCambio = new Subject<Rooms[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Rooms[]>(this.url)
  }
  insert(r: Rooms) {
    return this.http.post(this.urlinsert, r);
  }
  setList(listaNueva: Rooms[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Rooms>(`${this.url}/${id}`);
  }
  update(r: Rooms, id:number) {
    return this.http.put(`${this.url}/${id}`, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
