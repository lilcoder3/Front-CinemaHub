import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

import { TypePaymentsService } from '../../../../services/type-payments.service';
import { TicketService } from '../../../../services/ticket.service';
import { UsersService } from '../../../../services/users.service';
import { LoginService } from '../../../../services/login.service';
import { FunctionService } from '../../../../services/functions.service';

import { Function } from '../../../../models/Functions';
import { TypePayments } from '../../../../models/TypePayments';
import { Ticket } from '../../../../models/Ticket';
import { MovieCinema } from '../../../../models/MovieCinema';
import { Users } from '../../../../models/Users';

@Component({
  selector: 'app-crearticket',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
    RouterLink
  ],
  templateUrl: './creartickets.html',
  styleUrls: ['./creartickets.css']
})
export class CrearTicketComponent implements OnInit {
  form: FormGroup;
  listaFunciones: Function[] = [];
  listaTipoPagos: TypePayments[] = [];
  currentUser: any = null;

  constructor(
    private formBuilder: FormBuilder,
    private ticketService: TicketService,
    private functionService: FunctionService,
    private typePaymentsService: TypePaymentsService,
    private loginService: LoginService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      totalpay: [0, [Validators.required, Validators.min(1)]],  // Total a pagar
      fechapago: [new Date(), Validators.required],  // Fecha de pago
      functions_id: ['', Validators.required],  // Función seleccionada
      typepayments_id: ['', Validators.required]  // Método de pago
    });
  }

  ngOnInit(): void {
    // Obtener el nombre de usuario desde el servicio LoginService
    const username = this.loginService.showUsername();
    if (username) {
      this.functionService.list().subscribe((data) => {
        // Filtrar las funciones creadas por el usuario autenticado
        this.listaFunciones = data.filter(func => func.user_id.username === username);
      });
    }

    // Obtener la lista de métodos de pago
    this.typePaymentsService.list().subscribe((data) => {
      this.listaTipoPagos = data;
    });
  }

  // Función que calcula el total a pagar automáticamente
  calcularTotal(): void {
    const selectedFunctionId = this.form.get('functions_id')?.value;

    // Buscar solo el valor de totalchair de la función seleccionada
    const selectedFunction = this.listaFunciones.find(func => func.id === selectedFunctionId);

    if (selectedFunction) {
      const totalAsientos = selectedFunction.totalchair; // Obtener el número de asientos
      const totalAPagar = totalAsientos * 15; // Calcular el total a pagar (15 es el precio por asiento)
      this.form.patchValue({ totalpay: totalAPagar }); // Actualizar el total a pagar en el formulario
    }
  }

  // Función para guardar el ticket
 guardar(): void {
  if (this.form.valid) {
    const ticketData = this.form.value;
    const ticket = new Ticket();
    ticket.totalpay = ticketData.totalpay;
    ticket.fechapago = ticketData.fechapago;

    // Crear un objeto Functions con el ID, y valores vacíos para las otras propiedades
    ticket.functions_id = { 
      id: ticketData.functions_id, 
      totalchair: 0,  // Puedes dejar estos valores predeterminados o vacíos
      moviecinema_id: new MovieCinema(),  // Instancia vacía de MovieCinema
      user_id: new Users()  // Instancia vacía de Users
    };

    ticket.typepayments_id = { 
      id: ticketData.typepayments_id, 
      paymentname: '', 
      urlimage: '' 
    };

    // Llamar al servicio para crear el ticket
    this.ticketService.insert(ticket).subscribe(() => {
      this.router.navigate(['/tickets']);  // Redirigir a la lista de tickets
    });
  }
}



}
