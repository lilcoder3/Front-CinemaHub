import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router, RouterLink } from '@angular/router';

import { Rooms } from '../../../../models/Rooms';
import { RoomsService } from '../../../../services/rooms.service';
import { LoginService } from '../../../../services/login.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-listarrooms',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    RouterLink, NgIf
  ],
  templateUrl: './listarrooms.html',
  styleUrl: './listarrooms.css'
})
export class Listarrooms implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Rooms> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'nameroom', 'acciones'];

  role: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private sS: RoomsService,
    private router: Router,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    if (this.loginService.verificar()) {
      this.role = this.loginService.showRole();
    }

    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
      this.dataSource.paginator = this.paginator;
    });

    this.sS.getList().subscribe((data) => {
      this.dataSource.data = data;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number): void {
    this.sS.eliminar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(r => r.id !== id);
    });
  }

  editar(id: number): void {
    this.router.navigate(['rooms/ediciones', id]);
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  isCliente(): boolean {
    return this.role === 'CLIENTE';
  }
}
