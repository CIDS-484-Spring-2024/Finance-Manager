import {Component, OnInit} from '@angular/core';
import {Chart, LinearScale, BarController, CategoryScale, BarElement, DoughnutController, ArcElement, Legend, Title} from "chart.js";
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-fin-graph',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './fin-graph.component.html',
  styleUrl: './fin-graph.component.css'
})
export class FinGraphComponent implements OnInit{
  constructor() {
    //register chart elements so they're provided in the DOM
    Chart.register(LinearScale, BarController, CategoryScale, BarElement, DoughnutController, ArcElement, Legend, Title);

  }
  ngOnInit() {
     //graph html element we'll use to inject data into
     let graph = document.getElementById("userChart")

    //data to pass to doughnut chart
    let chartData = {
      labels: [
        'Monthly Expenses',
        'Annual Gross Income',
        'Fun money'
      ],
      datasets: [{
        label: 'My Finances',
        //Expenses and Earnings, respectively
        data: [48000, 59000, 11000],
        //style specifications
        backgroundColor: [
          'rgb(255,0,53)',
          'rgb(0,255,19)',
          'rgb(0,8,244)'
        ],
        borderWidth: [5],
        hoverOffset: 4
      }]
    };

     //ensure graph element is not null
    if(graph instanceof HTMLCanvasElement) {
      new Chart(graph, {
        type: 'doughnut',
        data: chartData,
        // options: {
        //   plugins: {
        //     title: {
        //       display: true,
        //       text: "Expense-to-Earnings",
        //       fullSize: true
        //     }
        //   }
        // }
      })
    }
  }



}
