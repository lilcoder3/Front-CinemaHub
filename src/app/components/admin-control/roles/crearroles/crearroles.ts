import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Roles } from '../../../../models/Roles';
import { Users } from '../../../../models/Users';
import { RolesService } from '../../../../services/roles.service';
import { UsersService } from '../../../../services/users.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-crearroles',
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
  templateUrl: './crearroles.html',
  styleUrl: './crearroles.css',
  standalone: true
})
export class Crearroles implements OnInit {
  form: FormGroup = new FormGroup({});
  r: Roles = new Roles();
  listUsuarios: Users[] = [];
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private sG: RolesService,
    private sUsuarios: UsersService,
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
      id: [{ value: '', disabled: true }], 
      user: ['', Validators.required ],
      rol: ['', Validators.required]
    });

    this.sUsuarios.list().subscribe(data => this.listUsuarios = data);
  }

  aceptar(): void {
    if (this.form.valid) {
      this.r.id = this.id; // tomamos el ID desde la variable, ya que el campo está deshabilitado
      this.r.rol = this.form.get('rol')?.value;
      this.r.user = { id: this.form.get('user')?.value } as Users;

      const obs = this.edicion
        ? this.sG.update(this.r, this.r.id)
        : this.sG.insert(this.r);

      obs.subscribe(() => {
        this.sG.list().subscribe(data => this.sG.setList(data));
        this.router.navigate(['roles']);
      });
    }
  }

  init(): void {
    if (this.edicion) {
      this.sG.listId(this.id).subscribe(data => {
        this.form.patchValue({
          id: data.id,
          user: data.user.id,
          rol: data.rol
        });
      });
    }
  }
}
