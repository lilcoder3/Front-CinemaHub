import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { Listarusers } from './listarusers/listarusers';

@Component({
  selector: 'app-users',
  imports: [RouterOutlet,Listarusers],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users implements OnInit {
  constructor(public route:ActivatedRoute){}
  ngOnInit(): void {}
}

