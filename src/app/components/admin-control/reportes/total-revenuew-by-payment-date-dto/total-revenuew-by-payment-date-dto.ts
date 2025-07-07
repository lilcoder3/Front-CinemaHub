import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../../services/ticket.service';
import { TotalRevenueByPaymentDateDTO } from '../../../../models/TotalRevenueByPaymentDateDTO';

@Component({
  selector: 'app-total-revenuew-by-payment-date-dto',
  imports: [CommonModule, FormsModule, NgChartsModule],
  templateUrl: './total-revenuew-by-payment-date-dto.html',
  styleUrl: './total-revenuew-by-payment-date-dto.css'
})
export class TotalRevenuewByPaymentDateDTO {
  startDate: string = '';
  endDate: string = '';
  chartLabels: string[] = [];
  chartData: any;
  chartType: ChartType = 'bar';

  constructor(private ticketService: TicketService) {}

  buscarIngresos() {
    if (!this.startDate || !this.endDate) return;

    this.ticketService.getRevenueByPaymentTypeAndDate(this.startDate, this.endDate).subscribe((data: TotalRevenueByPaymentDateDTO[]) => {
      this.chartLabels = data.map(item => item.paymentType);
      this.chartData = {
        labels: this.chartLabels,
        datasets: [
          {
            data: data.map(item => item.total),
            label: 'Total Recaudado',
            backgroundColor: '#4BACC6',
          }
        ]
      };
    });
  }
}
