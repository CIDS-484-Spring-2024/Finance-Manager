import {Component, OnInit} from '@angular/core';
import {Chart, LinearScale, BarController, CategoryScale, BarElement, DoughnutController, ArcElement, Legend, Title} from "chart.js";
import { BaseChartDirective } from 'ng2-charts';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-fin-graph',
  standalone: true,
  imports: [BaseChartDirective, CommonModule],
  templateUrl: './fin-graph.component.html',
  styleUrl: './fin-graph.component.css'
})
export class FinGraphComponent implements OnInit{
  constructor() {
    //register chart elements so they're provided in the DOM
    Chart.register(LinearScale, BarController, CategoryScale, BarElement, DoughnutController, ArcElement, Legend, Title);
  }

  //Variables used to display the users finance information
  AGI = 56000;
  monthlyExpenses = 4000;
  taxYear = 2023;
  UsState = "Texas";
  filingStatus = "single";
  goal = 4000000;
  fullname = "Welcome, John Fritzke";
  EERatio = (((this.monthlyExpenses * 12)/this.AGI)*100).toFixed(2) + "%";
  ratioLevel = this.getRatioLevel(this.monthlyExpenses*12, this.AGI);


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
          '#338fdc'
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

  getRatioLevel (expenses: number, earnings: number) {
    let ratio = ((expenses/earnings)*100);

    if(ratio <= 20) {return "Very Healthy"}

    else if (ratio <= 40) {return "Healthy"}

    else if (ratio <= 60) {return "Unhealthy"}

    else if (ratio <= 80) {return "Very Unhealthy"}

    else {return "Dangerous"}
  }



}
