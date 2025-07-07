import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { Review } from '../../../../models/Review';
import { Users } from '../../../../models/Users';
import { Movies } from '../../../../models/Movies';

import { ReviewService } from '../../../../services/review.service';
import { LoginService } from '../../../../services/login.service';
import { UsersService } from '../../../../services/users.service';
import { MoviesService } from '../../../../services/movies.service';

@Component({
  selector: 'app-crearreviews',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './crearreviews.html',
  styleUrl: './crearreviews.css'
})
export class Crearreviews implements OnInit {
  form: FormGroup = new FormGroup({});
  currentUser: Users = new Users();
  listapeliculas: Movies[] = [];
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private sR: ReviewService,
    private sL: LoginService,
    private sU: UsersService,
    private sM: MoviesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      points: [5, [Validators.required, Validators.min(1), Validators.max(5)]],
      descriptions: ['', Validators.required],
      reviewdate: [new Date(), Validators.required],
      movies_id: ['', Validators.required],
      user_id: ['']
    });

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.edicion = !!params['id'];
      if (this.edicion) {
        this.init();
      }
    });

    // Obtener usuario actual
    const username = this.sL.showUsername();
    if (username) {
      this.sU.userlogin(username).subscribe({
        next: (user: Users) => {
          this.currentUser = user;
          this.form.patchValue({
            user_id: user.id
          });
        },
        error: (err) => console.error('Error obteniendo usuario', err)
      });
    }

    // Obtener lista de películas
    this.sM.list().subscribe((data) => {
      this.listapeliculas = data;
    });
  }

  guardar(): void {
    if (this.form.valid) {
      const formValues = this.form.value;
      const r: Review = new Review();
      r.id = formValues.codigo;
      r.points = formValues.points;
      r.descriptions = formValues.descriptions;
      r.reviewdate = formValues.reviewdate;
      r.movies_id.id = formValues.movies_id;
      r.user_id.id = formValues.user_id;

      if (this.edicion) {
        this.sR.update(r, r.id).subscribe(() => {
          this.sR.list().subscribe((data) => this.sR.setList(data));
          this.router.navigate(['/reviews']);
        });
      } else {
        this.sR.insert(r).subscribe(() => {
          this.sR.list().subscribe((data) => this.sR.setList(data));
          this.router.navigate(['/reviews']);
        });
      }
    }
  }

  init(): void {
    this.sR.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.id,
        points: data.points,
        descriptions: data.descriptions,
        reviewdate: new Date(data.reviewdate),
        movies_id: data.movies_id.id,
        user_id: data.user_id.id
      });
    });
  }
}
