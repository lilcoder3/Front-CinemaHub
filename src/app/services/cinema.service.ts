import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Cinema } from '../models/Cinema';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class CinemaService {
  private url = `${base_url}/cinema`
  private urlinsert = `${base_url}/cinema/insert`
  private listaCambio = new Subject<Cinema[]>();
  constructor(private http:HttpClient) { }

  list(){
      return this.http.get<Cinema[]>(this.url)
  }
  insert(r: Cinema): Observable<Cinema> {
    return this.http.post<Cinema>(this.urlinsert, r);
  }
  setList(listaNueva: Cinema[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Cinema>(`${this.url}/${id}`);
  }
  update(r: Cinema, id:number) {
    return this.http.put(`${this.url}/${id}`, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
