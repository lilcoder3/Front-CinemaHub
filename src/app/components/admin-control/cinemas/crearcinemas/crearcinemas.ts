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
import { Cinema } from '../../../../models/Cinema';
import { CinemaService } from '../../../../services/cinema.service';
import { CitiesService } from '../../../../services/cities.service';
import { Cities } from '../../../../models/Cities';

@Component({
  selector: 'app-crearcinemas',
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
  templateUrl: './crearcinemas.html',
  styleUrl: './crearcinemas.css'
})
export class Crearcinemas implements OnInit {
  form: FormGroup = new FormGroup({});
  g: Cinema = new Cinema();
  listCities: Cities[] = [];
  edicioncine: boolean = false;
  id: number = 0;

  constructor(
    private sG: CinemaService,
    private sC: CitiesService,
    private router: Router,
    private formBuilder: FormBuilder,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicioncine = data['id'] != null;
      this.init();
    });

    this.form = this.formBuilder.group({
      id: [''],
      localname: ['', Validators.required],
      urlimage: ['', Validators.required],
      ciudad: ['', Validators.required], // campo con el mismo nombre que el DTO
    });

    this.sC.list().subscribe((data) => {
      this.listCities = data;
    });
  }

  aceptar(): void {
  if (this.form.valid) {
    this.g.id = this.form.value.id;
    this.g.localname = this.form.value.localname;
    this.g.urlimage = this.form.value.urlimage;

    this.g.cities.id = this.form.value.ciudad;

    if (this.edicioncine) {
      this.sG.update(this.g, this.g.id).subscribe(() => {
        this.sG.list().subscribe((data) => {
          this.sG.setList(data);
        });
      });
    } else {
      this.sG.insert(this.g).subscribe(() => {
        this.sG.list().subscribe((data) => {
          this.sG.setList(data);
        });
      });
    }

    this.router.navigate(['cinema']);
  }
}


  init(): void {
    if (this.edicioncine) {
      this.sG.listId(this.id).subscribe((data) => {
        this.form.patchValue({
          id: data.id,
          localname: data.localname,
          urlimage: data.urlimage,
          ciudad: data.cities.id,
        });
      });
    }
  }
}
