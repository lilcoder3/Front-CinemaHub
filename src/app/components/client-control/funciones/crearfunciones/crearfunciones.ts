import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { Function } from '../../../../models/Functions';
import { MovieCinema } from '../../../../models/MovieCinema';
import { Users } from '../../../../models/Users';

import { FunctionService } from '../../../../services/functions.service';
import { MovieCinemaService } from '../../../../services/movie-cinema.service';
import { LoginService } from '../../../../services/login.service';
import { UsersService } from '../../../../services/users.service';

@Component({
  selector: 'app-crearfunciones',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './crearfunciones.html',
  styleUrl: './crearfunciones.css'
})
export class Crearfunciones implements OnInit {
  form: FormGroup = new FormGroup({});
  currentUser: Users = new Users();
  listaMovieCinemas: MovieCinema[] = [];
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private sF: FunctionService,
    private sMC: MovieCinemaService,
    private sL: LoginService,
    private sU: UsersService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      codigo: [''],
      totalchair: [1, [Validators.required, Validators.min(1)]],
      moviecinema_id: ['', Validators.required],
      user_id: ['']
    });

    this.route.params.subscribe((params: Params) => {
      this.id = +params['id'];
      this.edicion = !!params['id'];
      if (this.edicion) {
        this.init();
      }
    });

    const username = this.sL.showUsername();
    if (username) {
      this.sU.userlogin(username).subscribe({
        next: (user: Users) => {
          this.currentUser = user;
          this.form.patchValue({ user_id: user.id });
        },
        error: (err) => console.error('Error obteniendo usuario', err)
      });
    }

    this.sMC.list().subscribe((data) => {
      this.listaMovieCinemas = data;
    });
  }

  guardar(): void {
    if (this.form.valid) {
      const f = this.form.value;
      const fun = new Function();
      fun.id = f.codigo;
      fun.totalchair = f.totalchair;
      fun.moviecinema_id.id = f.moviecinema_id;
      fun.user_id.id = f.user_id;

      if (this.edicion) {
        this.sF.update(fun, fun.id).subscribe(() => {
          this.sF.list().subscribe((data) => this.sF.setList(data));
          this.router.navigate(['/funcionescine']);
        });
      } else {
        this.sF.insert(fun).subscribe(() => {
          this.sF.list().subscribe((data) => this.sF.setList(data));
          this.router.navigate(['/funcionescine']);
        });
      }
    }
  }

  init(): void {
    this.sF.listId(this.id).subscribe((data) => {
      this.form.patchValue({
        codigo: data.id,
        totalchair: data.totalchair,
        moviecinema_id: data.moviecinema_id.id,
        user_id: data.user_id.id
      });
    });
  }
}
