import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UsersService } from '../../../services/users.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Users } from '../../../models/Users';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MoviesService } from '../../../services/movies.service';
import { Movies } from '../../../models/Movies';
 
@Component({
  selector: 'app-register',
  imports: [CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule, RouterModule  ],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register implements OnInit {
  form: FormGroup = new FormGroup({});
  g: Users = new Users();
  id: number = 0;
  constructor(
    private formBuilder: FormBuilder,
    private userService: UsersService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      username: ['', Validators.required],
      name: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  registrar(): void {
    if (this.form.valid) {
      const user = {
        id: this.form.value.id,
        username: this.form.value.username,
        name: this.form.value.name,
        lastname: this.form.value.lastname,
        email: this.form.value.email,
        password: this.form.value.password,
        enabled: true,
      };

      this.userService.insert(user).subscribe(() => {
        this.router.navigate(['/home']);
      });
    }
  }
}