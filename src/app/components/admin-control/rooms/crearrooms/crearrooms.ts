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
import { Rooms } from '../../../../models/Rooms';
import { RoomsService } from '../../../../services/rooms.service';

@Component({
  selector: 'app-crearrooms',
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
  templateUrl: './crearrooms.html',
  styleUrl: './crearrooms.css'
})
export class Crearrooms {
form: FormGroup = new FormGroup({});
  g: Rooms = new Rooms();
  ediciongender: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private sG: RoomsService,
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
      nameroom: ['', Validators.required],
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.g.id = this.form.value.id;
      this.g.nameroom = this.form.value.nameroom;
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
    this.router.navigate(['rooms']);
    }
  }
  init() {
    if (this.ediciongender) {
      this.sG.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          nameroom: new FormControl(data.nameroom, Validators.required),
        });
      });
    }
  }

  sortGenders(rooms: Rooms[]): Rooms[] {
    return rooms.sort((a, b) => a.id - b.id);
  }
}
