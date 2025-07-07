import { Component } from '@angular/core';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { QuantityFunctionsUserDateDTO } from '../../../../models/QuantityFunctionsUserDateDTO';
import { FunctionService } from '../../../../services/functions.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-quantity-functions-user-date-dto',
  imports: [CommonModule, NgChartsModule, FormsModule],
  templateUrl: './quantity-functions-user-date-dto.html',
  styleUrl: './quantity-functions-user-date-dto.css'
})
export class QuantityFunctionsUserDateDTOComponent {
  username: string = '';
  barChartLabels: string[] = [];
  barChartData: any;
  barChartType: ChartType = 'bar';

  constructor(private functionsService: FunctionService) {}

  buscarFuncionesPorUsuario() {
    if (!this.username.trim()) return;

    this.functionsService.getFunctionsByUserAndDate(this.username).subscribe((data: QuantityFunctionsUserDateDTO[]) => {
      this.barChartLabels = data.map(d => d.date);
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [{
          label: `Funciones de ${this.username}`,
          data: data.map(d => d.quantity),
          backgroundColor: '#4F81BC'
        }]
      };
    });
  }
}
