import { Component } from '@angular/core';
import { ChartType, ChartDataset } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../../services/ticket.service';
import { FindTicketsUsernameDTO as TicketUserModel } from '../../../../models/FindTicketsUsernameDTO';

@Component({
  selector: 'app-find-tickets-username-dto',
  standalone: true,
  templateUrl: './find-tickets-username-dto.html',
  styleUrls: ['./find-tickets-username-dto.css'],
  imports: [CommonModule, FormsModule, NgChartsModule],
})
export class FindTicketsUsernameDTO {
  username: string = '';

  lineChartData = {
    labels: [] as string[],
    datasets: [] as ChartDataset<'line'>[],
  };

  lineChartOptions = {
    responsive: true,
  };

  lineChartType: ChartType = 'line';
  lineChartLegend = true;

  constructor(private ticketService: TicketService) {}

  buscarTickets() {
    if (!this.username.trim()) return;

    this.ticketService.getTicketsByUsername(this.username).subscribe((data: TicketUserModel[]) => {
      this.lineChartData = {
        labels: data.map((item) => item.date),
        datasets: [
          {
            data: data.map((item) => item.pay),
            label: `Pagos de ${this.username}`,
            fill: true,
            tension: 0.4,
            borderColor: '#4F81BC',
            backgroundColor: 'rgba(79, 129, 189, 0.2)',
          },
        ],
      };
    });
  }
}
