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
import { Cities } from '../../../../models/Cities';
import { CitiesService } from '../../../../services/cities.service';

@Component({
  selector: 'app-crearcities',
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
  templateUrl: './crearcities.html',
  styleUrl: './crearcities.css'
})
export class Crearcities {
  form: FormGroup = new FormGroup({});
  g: Cities = new Cities();
  ediciongender: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private sG: CitiesService,
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
      namecity: ['', Validators.required],
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.g.id = this.form.value.id;
      this.g.namecity = this.form.value.namecity;
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
    this.router.navigate(['cities']);
    }
  }
  init() {
    if (this.ediciongender) {
      this.sG.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          namecity: new FormControl(data.namecity, Validators.required),
        });
      });
    }
  }

  sortGenders(cities: Cities[]): Cities[] {
    return cities.sort((a, b) => a.id - b.id);
  }
}
