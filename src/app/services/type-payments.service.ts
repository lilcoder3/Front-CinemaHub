import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';
import { TypePayments } from '../models/TypePayments';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class TypePaymentsService {
  private url = `${base_url}/typepayment`
  private urlinsert = `${base_url}/typepayment/Registro`
  private listaCambio = new Subject<TypePayments[]>();
  constructor(private http:HttpClient) { }
  list(){
    return this.http.get<TypePayments[]>(this.url)
  }
  insert(r: TypePayments) {
    return this.http.post(this.urlinsert, r);
  }
  setList(listaNueva: TypePayments[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<TypePayments>(`${this.url}/${id}`);
  }
  update(r: TypePayments, id:number) {
    return this.http.put(`${this.url}/${id}`, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
