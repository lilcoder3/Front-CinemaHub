import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';

import { Cinema } from '../../../../models/Cinema';
import { Rooms } from '../../../../models/Rooms';
import { CinemaRooms } from '../../../../models/CinemaRooms';
import { CinemaService } from '../../../../services/cinema.service';
import { RoomsService } from '../../../../services/rooms.service';
import { CinemaRoomsService } from '../../../../services/cinema-rooms.service';

@Component({
  selector: 'app-crearcinemarooms',
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
  templateUrl: './crearcinemarooms.html',
  styleUrl: './crearcinemarooms.css',
  standalone: true
})
export class Crearcinemarooms implements OnInit {
  form: FormGroup = new FormGroup({});
  g: CinemaRooms = new CinemaRooms();
  listCinemas: Cinema[] = [];
  listRooms: Rooms[] = [];
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private sG: CinemaRoomsService,
    private sCinema: CinemaService,
    private sRoom: RoomsService,
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
      cine: ['', Validators.required],
      sala: ['', Validators.required]
    });

    this.sCinema.list().subscribe(data => this.listCinemas = data);
    this.sRoom.list().subscribe(data => this.listRooms = data);
  }

  aceptar(): void {
    if (this.form.valid) {
      this.g.id = this.form.value.id;
      this.g.cinema = { id: this.form.value.cine } as Cinema;
      this.g.rooms = { id: this.form.value.sala } as Rooms;

      const obs = this.edicion
        ? this.sG.update(this.g, this.g.id)
        : this.sG.insert(this.g);

      obs.subscribe(() => {
        this.sG.list().subscribe(data => this.sG.setList(data));
        this.router.navigate(['cinemarooms']);
      });
    }
  }

  init(): void {
    if (this.edicion) {
      this.sG.listId(this.id).subscribe(data => {
        this.form.patchValue({
          id: data.id,
          cine: data.cinema.id,
          sala: data.rooms.id
        });
      });
    }
  }
}
