import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { CinemaRooms } from '../models/CinemaRooms';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class CinemaRoomsService {
  private url = `${base_url}/cinemaroom`
  private urlinsert = `${base_url}/cinemaroom/insert`
  private listaCambio = new Subject<CinemaRooms[]>();
  constructor(private http:HttpClient) { }

  list(){
    return this.http.get<CinemaRooms[]>(this.url)
  }
  insert(r: CinemaRooms): Observable<CinemaRooms> {
    return this.http.post<CinemaRooms>(this.urlinsert, r);
  }
  setList(listaNueva: CinemaRooms[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<CinemaRooms>(`${this.url}/${id}`);
  }
  update(r: CinemaRooms, id:number) {
    return this.http.put(`${this.url}/${id}`, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }

}
