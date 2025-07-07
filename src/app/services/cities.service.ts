import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Cities } from '../models/Cities';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class CitiesService {
  private url = `${base_url}/cities`
  private urlinsert = `${base_url}/cities/Registro`
  private listaCambio = new Subject<Cities[]>();
  constructor(private http:HttpClient) { }

  list(){
      return this.http.get<Cities[]>(this.url)
  }
  insert(r: Cities): Observable<Cities> {
    return this.http.post<Cities>(this.urlinsert, r);
  }
  setList(listaNueva: Cities[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Cities>(`${this.url}/${id}`);
  }
  update(r: Cities, id:number) {
    return this.http.put(`${this.url}/${id}`, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
