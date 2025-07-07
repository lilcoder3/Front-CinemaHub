import { Movies } from '../../../../models/Movies';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MoviesService } from '../../../../services/movies.service';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { App } from '../../../../app';
import { Router, RouterModule } from '@angular/router';
import { LoginService } from '../../../../services/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-listarmovies',
  imports: [MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    RouterModule,
    NgIf],
  templateUrl: './listarmovies.html',
  styleUrl: './listarmovies.css'
})
export class Listarmovies implements OnInit, AfterViewInit {
  role: string = "";
  dataSource: MatTableDataSource<Movies> = new MatTableDataSource();

  displayedColumns: string[] = [
    'id', 'namemovie', 'yearmovie', 'typemovie',
    'yearold', 'director', 'urlimage', 'acciones'
  ];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private mov: MoviesService,
    private aPP: App,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    // Obtener rol al iniciar
    if (this.loginService.verificar()) {
      this.role = this.loginService.showRole();
      console.log('Rol actual:', this.role); // Puedes quitarlo luego de verificar
    }

    // Carga inicial
    this.mov.list().subscribe((data) => {
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });

    // Actualización reactiva
    this.mov.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number): void {
    this.mov.eliminar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((movie) => movie.id !== id);
    });
  }

  editar(id: number): void {
    this.router.navigate(['movies/ediciones', id]);  
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  isCliente(): boolean {
    return this.role === 'CLIENTE';
  }
}