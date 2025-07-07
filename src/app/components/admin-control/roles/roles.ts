import { Component } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarroles } from './listarroles/listarroles';

@Component({
  selector: 'app-roles',
  imports: [RouterOutlet,Listarroles],
  templateUrl: './roles.html',
  styleUrl: './roles.css'
})
export class Roles {
constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
