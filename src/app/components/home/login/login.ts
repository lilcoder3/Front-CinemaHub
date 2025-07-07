import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import Swal from 'sweetalert2';
import { JwtRequest } from '../../../models/JwtRequest';
import { JwtHelperService } from '@auth0/angular-jwt';
import { RouterLink, Router, ActivatedRoute } from '@angular/router';
import { LoginService } from '../../../services/login.service';
@Component({
  selector: 'app-login',
  imports: [FormsModule, MatFormFieldModule , MatButtonModule, MatInputModule,RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit{
  constructor(
    private loginService: LoginService,
    private router: Router,
    public route: ActivatedRoute
  ) {}

  username: string = '';
  password: string = '';
  mensaje: string = '';
  id: number=0;

  ngOnInit(): void {}

  login() {
    let request = new JwtRequest();
    request.username = this.username;
    request.password = this.password;

    this.loginService.login(request).subscribe(
      (data: any) => {
        let token = data.jwttoken;
        sessionStorage.setItem('token', data.jwttoken);
        sessionStorage.setItem('username', this.username);

        const helper = new JwtHelperService();
        const decodedToken = helper.decodeToken(token);

        const userId = decodedToken.id; 
      if (userId) {
        sessionStorage.setItem('userId', userId.toString());
        console.log('ID del usuario obtenido del token:', userId);
      } else {
        console.warn('No se encontró el ID en el token');
      }
        // Alerta de éxito con SweetAlert2
        Swal.fire({
          icon: 'success',
          title: 'Login exitoso',
          text: 'Bienvenido al sistema',
          confirmButtonColor: '#57614F', // Puedes usar tus colores personalizados
        }).then(() => {
          this.router.navigate(['home']);
        });
      },
      (error) => {
        this.mensaje = 'Credenciales incorrectas!!!';

        // Alerta de error con SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error de autenticación',
          text: this.mensaje,
          confirmButtonColor: '#B3B792', // Puedes usar tus colores personalizados
        });
      }
    );
  }


  
}