import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Users } from '../models/Users';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private url = `${base_url}/User`;
  private listaCambio = new Subject<Users[]>();
  constructor(private httpClient: HttpClient) {}
  list() {
    return this.httpClient.get<Users[]>(this.url);
  }
  insert(p: Users): Observable<Users> {
    return this.httpClient.post<Users>(`${this.url}/Registro`, p);
  }
  setList(listaNueva: Users[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable();
  }
  listId(id: number) {
    return this.httpClient.get<Users>(`${this.url}/${id}`);
  }
  update(c:Users, id:number): Observable<void> {
    return this.httpClient.put<void>(`${this.url}/${id}`, c);
  }
  eliminar(id: number) {
    return this.httpClient.delete(`${this.url}/${id}`);
  }

  userlogin(username: string): Observable<Users> {
    return this.httpClient.get<Users>(`${this.url}/nombreusuario?nombreuser=${username}`);
  }

}
