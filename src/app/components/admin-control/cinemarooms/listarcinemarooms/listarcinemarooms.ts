import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, NgIf } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';
import { CinemaRooms } from '../../../../models/CinemaRooms';
import { CinemaRoomsService } from '../../../../services/cinema-rooms.service';
import { LoginService } from '../../../../services/login.service';

@Component({
  selector: 'app-listarcinemarooms',
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
  templateUrl: './listarcinemarooms.html',
  styleUrl: './listarcinemarooms.css'
})
export class Listarcinemarooms implements OnInit, AfterViewInit {
  role: string = '';
  displayedColumns: string[] = ['id', 'cine', 'sala', 'acciones'];
  dataSource: MatTableDataSource<CinemaRooms> = new MatTableDataSource();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private sI: CinemaRoomsService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.loginService.verificar()) {
      this.role = this.loginService.showRole();
    }

    this.sI.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(this.sortById(data));
      this.dataSource.paginator = this.paginator;
    });

    this.sI.getList().subscribe((data) => {
      this.dataSource = new MatTableDataSource(this.sortById(data));
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  eliminar(id: number) {
    this.sI.eliminar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(item => item.id !== id);
    });
  }

  editar(id: number) {
    this.router.navigate(['cinemarooms/ediciones', id]);
  }

  sortById(data: CinemaRooms[]): CinemaRooms[] {
    return data.sort((a, b) => a.id - b.id);
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  isCliente(): boolean {
    return this.role === 'CLIENTE';
  }
}
