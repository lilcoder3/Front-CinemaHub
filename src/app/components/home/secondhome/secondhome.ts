import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-secondhome',
  imports: [],
  templateUrl: './secondhome.html',
  styleUrl: './secondhome.css'
})
export class Secondhome implements OnInit {
  username: string = '';
  currentTime: string = '';
  whatsappLink: string = 'https://wa.me/967775359';
  whatsappLinkAdmin: string = 'https://wa.me/967775359';

  constructor(private loginService: LoginService) {}
  ngOnInit(): void {
    this.updateTime();
    this.username = this.loginService.showUsername();
    setInterval(() => {
      this.updateTime();
    }, 1000); // Actualiza la hora cada segundo
  }

  updateTime(): void {
    const now = new Date();
    this.currentTime = now.toLocaleTimeString('es-PE', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  }
}