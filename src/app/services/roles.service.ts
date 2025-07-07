import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { Roles } from '../models/Roles';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class RolesService {
  private url = `${base_url}/roles`
  private urlinsert = `${base_url}/roles/Registro`
  private listaCambio = new Subject<Roles[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<Roles[]>(this.url)
  }
  insert(r: Roles) {
    return this.http.post(this.urlinsert, r);
  }
  setList(listaNueva: Roles[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Roles>(`${this.url}/${id}`);
  }
  update(r: Roles, id:number) {
    return this.http.put(`${this.url}/${id}`, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
