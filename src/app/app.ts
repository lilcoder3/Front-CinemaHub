import { AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { LoginService } from './services/login.service';
import { NgIf } from '@angular/common';
import { HasRoleDirective } from './directives/has-role';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    RouterLink,
    NgIf],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected title = 'frontpeliculanuevo';

 ngOnInit(): void {
  }
  role: string = '';
  username: string = '';
  constructor(private loginService: LoginService, private router: Router) {}

  eliminar(){
    sessionStorage.clear();
    console.log("se cerró sesión con éxito!!")
    this.router.navigate(['/landinghome']);
  }

  verificar() {
    this.role = this.loginService.showRole();
      this.username = this.loginService.showUsername();
    return this.loginService.verificar();
  }
  isAdmin() {
    return this.role === 'ADMIN';
  }

  isCliente() {
    return this.role === 'CLIENTE';
  }
  
}
