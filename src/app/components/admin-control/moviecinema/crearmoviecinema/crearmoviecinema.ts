import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';

import { CinemaRooms } from '../../../../models/CinemaRooms';
import { Movies } from '../../../../models/Movies';
import { MovieCinema } from '../../../../models/MovieCinema';
import { CinemaRoomsService } from '../../../../services/cinema-rooms.service';
import { MoviesService } from '../../../../services/movies.service';
import { MovieCinemaService } from '../../../../services/movie-cinema.service';

@Component({
  selector: 'app-crearmoviecinema',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    NgxMaterialTimepickerModule,
  ],
  templateUrl: './crearmoviecinema.html',
  styleUrl: './crearmoviecinema.css'
})
export class Crearmoviecinema implements OnInit {
  form: FormGroup = new FormGroup({});
  g: MovieCinema = new MovieCinema();
  listCinemaRooms: CinemaRooms[] = [];
  listMovies: Movies[] = [];
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private sG: MovieCinemaService,
    private sCR: CinemaRoomsService,
    private sM: MoviesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = this.id != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      cinemaroom: ['', Validators.required],
      movie: ['', Validators.required],
      date: ['', Validators.required],
      startTime: ['', Validators.required],
      endTime: ['', Validators.required]
    });

    this.sCR.list().subscribe(data => this.listCinemaRooms = data);
    this.sM.list().subscribe(data => this.listMovies = data);
  }

  aceptar(): void {
    if (this.form.valid) {
      const date = this.form.value.date;
      const startTime = this.form.value.startTime;
      const endTime = this.form.value.endTime;

      this.g = new MovieCinema(); // limpiar datos anteriores
      this.g.id = this.form.value.id;
      this.g.cinemarooms_id.id = this.form.value.cinemaroom;
      this.g.movies_id.id = this.form.value.movie;
      this.g.startinghour = this.combineDateTime(date, startTime);
      this.g.endinghour = this.combineDateTime(date, endTime);

      const obs = this.edicion
        ? this.sG.update(this.g, this.g.id)
        : this.sG.insert(this.g);

      obs.subscribe(() => {
        this.sG.list().subscribe(data => this.sG.setList(data));
        this.router.navigate(['/moviecinema']);
      });
    }
  }

  cancelar(): void {
    this.form.reset();
    this.router.navigate(['/moviecinema']);
  }

  init(): void {
    if (this.edicion) {
      this.sG.listId(this.id).subscribe(data => {
        const start = new Date(data.startinghour);
        const end = new Date(data.endinghour);
        this.g = data;

        this.form.patchValue({
          id: data.id,
          cinemaroom: data.cinemarooms_id.id,
          movie: data.movies_id.id,
          date: start,
          startTime: this.formatTime(start),
          endTime: this.formatTime(end)
        });
      });
    }
  }

  combineDateTime(date: Date, time: string): Date {
    const [hours, minutes] = time.split(':').map(Number);
    const combined = new Date(date);
    combined.setHours(hours, minutes, 0, 0);
    return combined;
  }

  formatTime(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
  }
}
