import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarfunciones } from './listarfunciones/listarfunciones';

@Component({
  selector: 'app-funciones',
  imports: [RouterOutlet,Listarfunciones],
  templateUrl: './funciones.html',
  styleUrl: './funciones.css'
})
export class Funciones implements OnInit {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}
