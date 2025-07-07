import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Movies } from '../models/Movies';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class MoviesService {
  private url = `${base_url}/movies`
  private urlinsert = `${base_url}/movies/Registro`
  private urlregistermovielogin=`${base_url}/movieregister/listar`
  private listaCambio = new Subject<Movies[]>();
  constructor(private http:HttpClient) { }

  list(){
      return this.http.get<Movies[]>(this.url)
  }

  listmovieregister(){
      return this.http.get<Movies[]>(this.urlregistermovielogin)
  }
  insert(r: Movies): Observable<Movies> {
    return this.http.post<Movies>(this.urlinsert, r);
  }
  setList(listaNueva: Movies[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Movies>(`${this.url}/${id}`);
  }
  update(r: Movies, id:number) {
    return this.http.put(`${this.url}/${id}`, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
}
