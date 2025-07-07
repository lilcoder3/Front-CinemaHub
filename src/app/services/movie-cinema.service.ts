import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { MovieCinema } from '../models/MovieCinema';
import { HttpClient } from '@angular/common/http';
import { FindMovieScheduleDTO } from '../models/FindMovieScheduleDTO';
import { QuantityFunctionsCinemaDTO } from '../models/QuantityFunctionsCinemaDTO';
import { QuantityMoviesCityDTO } from '../models/QuantityMoviesCityDTO';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class MovieCinemaService {
  private url = `${base_url}/moviecinema`
  private urlinsert = `${base_url}/moviecinema/Registro`
  private listaCambio = new Subject<MovieCinema[]>();
  constructor(private http:HttpClient) { }

  list(){
      return this.http.get<MovieCinema[]>(this.url)
  }
  insert(r: MovieCinema): Observable<MovieCinema> {
    return this.http.post<MovieCinema>(this.urlinsert, r);
  }
  setList(listaNueva: MovieCinema[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<MovieCinema>(`${this.url}/${id}`);
  }
  update(r: MovieCinema, id:number) {
    return this.http.put(`${this.url}/${id}`, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getMovieScheduleByCinema(cinema: string) {
  return this.http.get<FindMovieScheduleDTO[]>(`${this.url}/funcionesPorCine?cinema=${cinema}`);
  }

  getQuantityFunctionsByCinema(): Observable<QuantityFunctionsCinemaDTO[]> {
    return this.http.get<QuantityFunctionsCinemaDTO[]>(`${this.url}/cantidadFuncionesCine`);
  }

  getQuantityMoviesByCity(): Observable<QuantityMoviesCityDTO[]> {
  return this.http.get<QuantityMoviesCityDTO[]>(`${this.url}/cantidadPeliculasCiudad`);
  }


}
