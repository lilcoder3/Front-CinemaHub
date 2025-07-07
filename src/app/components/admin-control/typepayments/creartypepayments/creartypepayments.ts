import { Component, OnInit } from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import moment from 'moment';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TypePayments } from '../../../../models/TypePayments';
import { TypePaymentsService } from '../../../../services/type-payments.service';

@Component({
  selector: 'app-creartypepayments',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule
  ],
  templateUrl: './creartypepayments.html',
  styleUrl: './creartypepayments.css'
})
export class Creartypepayments implements OnInit {
  form: FormGroup = new FormGroup({});
  g: TypePayments = new TypePayments();
  ediciongender: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private sG: TypePaymentsService,
    private router:Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.ediciongender = data['id'] != null;      
      this.init();
    });
    this.form = this.formBuilder.group({
      id: [''],
      paymentname: ['', Validators.required],
      urlimage: ['', Validators.required],
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.g.id = this.form.value.id;
      this.g.paymentname = this.form.value.paymentname;
      this.g.urlimage = this.form.value.urlimage;
      if (this.ediciongender) {
        this.sG.update(this.g, this.g.id).subscribe((data) => {
          this.sG.list().subscribe((data) => {
            this.sG.setList(this.sortGenders(data));
          });
        });
      }else{
        this.sG.insert(this.g).subscribe((data) => {
          this.sG.list().subscribe((data) => {
            this.sG.setList(this.sortGenders(data));
          });
        });
      }
    this.router.navigate(['typepayment']);
    }
  }
  init() {
    if (this.ediciongender) {
      this.sG.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          id: new FormControl(data.id),
          paymentname: new FormControl(data.paymentname, Validators.required),
          urlimage: new FormControl(data.urlimage, Validators.required),
        });
      });
    }
  }

  sortGenders(typepay: TypePayments[]): TypePayments[] {
    return typepay.sort((a, b) => a.id - b.id);
  }
}
