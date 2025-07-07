import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { RolesService } from '../../../../services/roles.service';
import { Router, RouterLink } from '@angular/router';
import { App } from '../../../../app';
import { Roles } from '../../../../models/Roles';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-listarroles',
  imports: [MatTableModule,
    MatCardModule,
    CommonModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    RouterLink],
  templateUrl: './listarroles.html',
  styleUrl: './listarroles.css'
})
export class Listarroles implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<Roles> = new MatTableDataSource();
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(private sI: RolesService, private aPP: App) {}

  ngOnInit(): void {
    this.sI.list().subscribe((data)=>{ //agrega los datos en el data source
      this.dataSource = new MatTableDataSource(this.sortGenders(data));
    })
    this.sI.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(this.sortGenders(data))
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  sortGenders(cinema: Roles[]): Roles[] {
      return cinema.sort((a, b) => a.id - b.id);
    }

  isADMIN(): boolean {
    return this.aPP.isAdmin();
  }

  isCLIENT(): boolean {
    return this.aPP.isCliente();
  }
}
