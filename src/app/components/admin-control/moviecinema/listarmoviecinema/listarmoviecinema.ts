import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatButtonModule } from '@angular/material/button';

import { MovieCinema } from '../../../../models/MovieCinema';
import { MovieCinemaService } from '../../../../services/movie-cinema.service';
import { App } from '../../../../app';

@Component({
  selector: 'app-listarmoviecinema',
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
    RouterLink,
  ],
  templateUrl: './listarmoviecinema.html',
  styleUrl: './listarmoviecinema.css'
})
export class Listarmoviecinema implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<MovieCinema> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sI: MovieCinemaService, private aPP: App) {}

  ngOnInit(): void {
    this.sI.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(this.sortById(data));
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
      this.sI.list().subscribe((data) => {
        this.sI.setList(this.sortById(data));
      });
    });
  }

  sortById(data: MovieCinema[]): MovieCinema[] {
    return data.sort((a, b) => a.id - b.id);
  }

  isADMIN(): boolean {
    return this.aPP.isAdmin();
  }

  isCLIENT(): boolean {
    return this.aPP.isCliente();
  }
}
