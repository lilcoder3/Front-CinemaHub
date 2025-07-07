import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Movies } from '../../../../models/Movies';
import { MoviesService } from '../../../../services/movies.service';

@Component({
  selector: 'app-crearmovies',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './crearmovies.html',
  styleUrl: './crearmovies.css'
})
export class Crearmovies implements OnInit {
  form: FormGroup = new FormGroup({});
  g: Movies = new Movies();
  ediciongender: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private sG: MoviesService,
    private router:Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.ediciongender = data['id'] != null;      
      this.init();
    });
    this.form = this.formBuilder.group({
      id: [''],
      namemovie: ['', Validators.required],
      yearmovie: ['', Validators.required],
      typemovie: ['', Validators.required],
      yearold: ['', Validators.required],
      director: ['', Validators.required],
      description: ['', Validators.required],
      urlimage: ['', Validators.required]
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.g.id = this.form.value.id;
      this.g.namemovie = this.form.value.namemovie;
      this.g.yearmovie = this.form.value.yearmovie;
      this.g.typemovie = this.form.value.typemovie;
      this.g.yearold = this.form.value.yearold;
      this.g.director = this.form.value.director;
      this.g.description = this.form.value.description;
      this.g.urlimage = this.form.value.urlimage;
      if (this.ediciongender) {
        this.sG.update(this.g, this.g.id).subscribe((data) => {
          this.sG.list().subscribe((data) => {
            this.sG.setList(this.sortGenders(data));
          });
        });
      }else{
        this.sG.insert(this.g).subscribe((data) => {
          this.sG.list().subscribe((data) => {
            this.sG.setList(this.sortGenders(data));
          });
        });
      }
    this.router.navigate(['movies']);
    }
  }
  init() {
    if (this.ediciongender) {
      this.sG.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          namemovie: new FormControl(data.namemovie, Validators.required),
          yearmovie: new FormControl(data.yearmovie, Validators.required),
          typemovie: new FormControl(data.typemovie, Validators.required),
          yearold: new FormControl(data.yearold, Validators.required),
          director: new FormControl(data.director, Validators.required),
          description: new FormControl(data.description, Validators.required),
          urlimage: new FormControl(data.urlimage, Validators.required),
        });
      });
    }
  }

  sortGenders(movies: Movies[]): Movies[] {
    return movies.sort((a, b) => a.id - b.id);
  }

}
