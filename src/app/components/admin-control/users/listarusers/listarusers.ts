import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';

import { UsersService } from '../../../../services/users.service';
import { Router } from '@angular/router';
import { Users } from '../../../../models/Users';

@Component({
  selector: 'app-listarusers',
  imports: [MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule],
  templateUrl: './listarusers.html',
  styleUrl: './listarusers.css'
})
export class Listarusers implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Users> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'username', 'email', 'actions'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private userService: UsersService, private router: Router) {}

  ngOnInit(): void {
    this.userService.list().subscribe((data: Users[]) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;  // Asignar el paginador al dataSource
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number): void {
    this.userService.eliminar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(user => user.id !== id);
    });
  }

  edit(id: number): void {
    this.router.navigate(['/users/edit', id]);
  }
}