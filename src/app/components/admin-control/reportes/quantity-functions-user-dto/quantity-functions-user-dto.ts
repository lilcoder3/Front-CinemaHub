import { Component, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { NgChartsModule } from 'ng2-charts';
import { QuantityFunctionsUsersDTO } from '../../../../models/QuantityFunctionsUsersDTO';
import { CommonModule } from '@angular/common';
import { FunctionService } from '../../../../services/functions.service';

@Component({
  selector: 'app-quantity-functions-user-dto',
  imports: [CommonModule, NgChartsModule],
  templateUrl: './quantity-functions-user-dto.html',
  styleUrl: './quantity-functions-user-dto.css'
})
export class QuantityFunctionsUserDTO {
  barChartLabels: string[] = [];
  barChartData: any;
  barChartType: ChartType = 'bar';

  constructor(private functionsService: FunctionService) {}

  ngOnInit(): void {
    this.functionsService.getQuantityFunctionsByUser().subscribe((data: QuantityFunctionsUsersDTO[]) => {
      this.barChartLabels = data.map(d => d.username);
      this.barChartData = {
        labels: this.barChartLabels,
        datasets: [
          {
            label: 'Cantidad de Funciones por Usuario',
            data: data.map(d => d.quantity),
            backgroundColor: '#4BACC6'
          }
        ]
      };
    });
  }
}
