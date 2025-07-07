import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table'
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { Cinema } from '../../../../models/Cinema';
import { CinemaService } from '../../../../services/cinema.service';
import { App } from '../../../../app';
import { LoginService } from '../../../../services/login.service';

@Component({
  selector: 'app-listarcinemas',
  standalone: true,
  imports: [
    MatTableModule,
    MatCardModule,
    CommonModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink,NgIf
  ],
  templateUrl: './listarcinemas.html',
  styleUrl: './listarcinemas.css'
})
export class Listarcinemas implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['id', 'localname', 'urlimage', 'Cities', 'acciones'];
  dataSource: MatTableDataSource<Cinema> = new MatTableDataSource();
  role: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private sI: CinemaService,
    private aPP: App,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el rol
    if (this.loginService.verificar()) {
      this.role = this.loginService.showRole();
      console.log('Rol actual:', this.role);
    }

    this.sI.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(this.sortGenders(data));
      this.dataSource.paginator = this.paginator;
    });

    this.sI.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(this.sortGenders(data));
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sI.eliminar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter((c) => c.id !== id);
    });
  }

  editar(id: number) {
    this.router.navigate(['cinema/ediciones', id]);
  }

  sortGenders(cinema: Cinema[]): Cinema[] {
    return cinema.sort((a, b) => a.id - b.id);
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  isCliente(): boolean {
    return this.role === 'CLIENTE';
  }
}
