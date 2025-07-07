import { Component, OnInit } from '@angular/core';
import { MoviesService } from '../../../services/movies.service';
import { Movies } from '../../../models/Movies';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-firsthome',
  imports: [CommonModule,
    RouterLink  ],
  templateUrl: './firsthome.html',
  styleUrl: './firsthome.css'
})
export class Firsthome implements OnInit {
  movies: Movies[] = [];
  currentMovieIndex: number = 0;

  constructor(
    private moviesService: MoviesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadMovies();
  }

  loadMovies(): void {
    // Cargamos las películas desde el servicio
    this.moviesService.listmovieregister().subscribe((data: Movies[]) => {
      this.movies = data;
    });
  }

  nextMovie(): void {
    if (this.currentMovieIndex < this.movies.length - 3) {
      this.currentMovieIndex++;
    } else {
      this.currentMovieIndex = 0; // Volver al inicio si llegamos al final
    }
  }

  prevMovie(): void {
    if (this.currentMovieIndex > 0) {
      this.currentMovieIndex--;
    } else {
      this.currentMovieIndex = this.movies.length - 3; // Ir al final si estamos al principio
    }
  }

  // Devuelve solo las películas visibles (3 películas por vez)
  getVisibleMovies(): Movies[] {
    return this.movies.slice(this.currentMovieIndex, this.currentMovieIndex + 3);
  }

  goToLogin(): void {
    // Redirige al login cuando se hace clic en "Ver opciones"
    this.router.navigate(['/login']);
  }
}
