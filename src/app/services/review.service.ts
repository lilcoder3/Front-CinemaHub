import { Injectable } from '@angular/core';
import { environment } from '../environments/environment';
import { Observable, Subject } from 'rxjs';
import { Review } from '../models/Review';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GetMovieReviewDTO } from '../models/GetMovieReviewDTO';

const base_url = environment.base
@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  private url = `${base_url}/review`
  private urlinsert = `${base_url}/review/Registro`
  private listaCambio = new Subject<Review[]>();
  constructor(private http:HttpClient) { }

  list(){
      return this.http.get<Review[]>(this.url)
  }
  insert(r: Review): Observable<Review> {
    return this.http.post<Review>(this.urlinsert, r);
  }
  setList(listaNueva: Review[]) {
    this.listaCambio.next(listaNueva);
  }
  getList() {
    return this.listaCambio.asObservable()
  }
  listId(id: number) {
    return this.http.get<Review>(`${this.url}/${id}`);
  }
  update(r: Review, id:number) {
    return this.http.put(`${this.url}/${id}`, r);
  }
  eliminar(id: number) {
    return this.http.delete(`${this.url}/${id}`);
  }
  getStatsByMovieName(movie: string): Observable<GetMovieReviewDTO[]> {
    const params = new HttpParams().set('movie', movie);
    return this.http.get<GetMovieReviewDTO[]>(`${this.url}/estadisticasResenas`, { params });
  }

}
