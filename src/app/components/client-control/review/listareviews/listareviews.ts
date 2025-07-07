import { Review } from '../../../../models/Review';
import { MatButtonModule } from '@angular/material/button';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { ReviewService } from '../../../../services/review.service';
import { App } from '../../../../app';
import { LoginService } from '../../../../services/login.service';
import { CommonModule, NgIf } from '@angular/common';

@Component({
  selector: 'app-listareviews',
  standalone: true,
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    CommonModule, NgIf
    
  ],
  templateUrl: './listareviews.html',
  styleUrl: './listareviews.css'
})
export class Listareviews implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Review> = new MatTableDataSource();
  displayedColumns: string[] = [
    'id',
    'reviewdate',
    'descriptions',
    'points',
    'movie',
    'user',
    'acciones'
  ];

  role: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private reviewService: ReviewService,
    private router: Router,
    private app: App,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    if (this.loginService.verificar()) {
      this.role = this.loginService.showRole();
    }
    this.cargarDatos();
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  cargarDatos(): void {
    this.reviewService.list().subscribe((data) => {
      this.dataSource.data = data;
      if (this.paginator) {
        this.dataSource.paginator = this.paginator;
      }
    });
  }

  delete(id: number): void {
    this.reviewService.eliminar(id).subscribe(() => {
      this.cargarDatos();
    });
  }

  editar(id: number): void {
    this.router.navigate(['reviews/ediciones', id]);
  }

  isAdmin(): boolean {
    return this.role === 'ADMIN';
  }

  isCliente(): boolean {
    return this.role === 'CLIENTE';
  }
}
