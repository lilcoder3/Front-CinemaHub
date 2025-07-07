import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { CommonModule } from '@angular/common';
import { TicketService } from '../../../../services/ticket.service';
import { QuantityTotalRevenueByPaymentDTO } from '../../../../models/QuantityTotalRevenueByPaymentDTO';


@Component({
  selector: 'app-quantity-total-revenue-by-payment-dto',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './quantity-total-revenue-by-payment-dto.html',
  styleUrl: './quantity-total-revenue-by-payment-dto.css'
})
export class QuantityTotalRevenueByPaymentDTOcomponent implements OnInit {
  chartLabels: string[] = [];
  chartData: any;
  chartType: ChartType = 'pie';

  constructor(private ticketService: TicketService) {}

  ngOnInit(): void {
    this.ticketService.getTotalRevenueByPayment().subscribe((data: QuantityTotalRevenueByPaymentDTO[]) => {
      this.chartLabels = data.map(item => item.paymentType);
      this.chartData = {
        labels: this.chartLabels,
        datasets: [
          {
            data: data.map(item => item.quantity),
            backgroundColor: ['#4BACC6', '#C0504D', '#9BBB59', '#F79646'],
          },
        ],
      };
    });
  }
}
