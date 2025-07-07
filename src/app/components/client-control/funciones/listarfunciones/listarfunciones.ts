import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

import { FunctionService } from '../../../../services/functions.service';
import { LoginService } from '../../../../services/login.service';
import { Function } from '../../../../models/Functions';
import { Users } from '../../../../models/Users';
import { App } from '../../../../app';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-listarfunciones',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule, NgIf
  ],
  templateUrl: './listarfunciones.html',
  styleUrls: ['./listarfunciones.css']
})
export class Listarfunciones implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Function> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'totalchair', 'pelicula', 'cine', 'sala', 'usuario', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  username: string = '';
  role: string = '';

  constructor(
    private functionService: FunctionService,
    private loginService: LoginService,
    private router: Router,
    private app: App
  ) {}

  ngOnInit(): void {
    if (this.loginService.verificar()) {
      this.username = this.loginService.showUsername();
      this.role = this.loginService.showRole();
    }

    this.functionService.list().subscribe((data) => {
      const filteredData = this.isAdmin()
        ? data
        : data.filter(f => f.user_id?.username === this.username);

      this.dataSource = new MatTableDataSource(filteredData);
      this.dataSource.paginator = this.paginator;
    });
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  delete(id: number): void {
    this.functionService.eliminar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(f => f.id !== id);
    });
  }

  editar(id: number): void {
    this.router.navigate(['funcionescine/ediciones', id]);
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  isCliente(): boolean {
    return this.role === 'CLIENTE';
  }
}
