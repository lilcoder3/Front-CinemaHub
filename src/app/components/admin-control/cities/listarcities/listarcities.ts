import { Cities } from '../../../../models/Cities';
import { MatButtonModule } from '@angular/material/button';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { App } from '../../../../app';
import { CitiesService } from '../../../../services/cities.service';
import { LoginService } from '../../../../services/login.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-listarcities',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    RouterLink,
    CommonModule,NgIf
  ],
  templateUrl: './listarcities.html',
  styleUrl: './listarcities.css'
})
export class Listarcities implements OnInit, AfterViewInit {
  role: string = '';
  dataSource: MatTableDataSource<Cities> = new MatTableDataSource();
  displayedColumns: string[] = ['id', 'namecity', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private sS: CitiesService,
    private router: Router,
    private aPP: App,
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
      this.dataSource.data = this.dataSource.data.filter(s => s.id !== id);
    });
  }

  editar(id: number): void {
    this.router.navigate(['cities/ediciones', id]);
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  isCliente(): boolean {
    return this.role === 'CLIENTE';
  }
}
