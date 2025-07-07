import { TypePayments } from '../../../../models/TypePayments';
import { MatButtonModule } from '@angular/material/button';
import { AfterViewInit, ApplicationModule, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Router, RouterLink } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { TypePaymentsService } from '../../../../services/type-payments.service';
import { App } from '../../../../app';


@Component({
  selector: 'app-listartypepayments',
  imports: [
    MatButtonModule,
    MatTableModule,
    MatFormFieldModule,
    MatPaginatorModule,
    MatInputModule,
    MatIconModule
  ],
  templateUrl: './listartypepayments.html',
  styleUrl: './listartypepayments.css'
})
export class Listartypepayments implements OnInit, AfterViewInit {
  dataSource: MatTableDataSource<TypePayments> = new MatTableDataSource();
  displayedColumns: string[] = [
    
    'id',
    'paymentname',
    'urlimage',
    'acciones'
  ]

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  ngAfterViewInit(): void {}

  constructor(private sS: TypePaymentsService, private router: Router, private aPP:App) {}

  ngOnInit(): void {
    this.sS.list().subscribe((data) => {
      this.dataSource = new MatTableDataSource(data);
    });
    this.sS.getList().subscribe((data)=>{
      this.dataSource=new MatTableDataSource(data)
    })
  }
  isObject(value: any): boolean { return typeof value === 'object'; }


  delete(id: number): void {
    this.sS.eliminar(id).subscribe(() => {
      this.dataSource.data = this.dataSource.data.filter(s => s.id !== id);
    });
  }

  editar(id: number): void {
    this.router.navigate(['typepayment/ediciones', id]);  
  }

  isADMIN(): boolean {
    return this.aPP.isAdmin();
  }
  isCLIENTE(): boolean {
    return this.aPP.isCliente();
  }

}
