import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import * as Chart from 'chart.js';
import { Table } from '../dashboard/dashboard';
import { DashboardService } from '../dashboard/dashboard.service';
import 'chartjs-plugin-labels';

// export interface Table {
//   title: string;
//   author: string;
//   date: string;
//   signed: string;
//   completeby: string;
// }
// const array: Table[] = [
//   { title: 'Transport Contract', author: 'Raja M.', date: '14/08/2020', signed: 'User 1(1/3)', completeby: '14/08/2020' },
//   { title: 'Transport Contract', author: 'Raja M.', date: '14/08/2020', signed: 'User 1(1/3)', completeby: '14/08/2020' },
//   { title: 'Transport Contract', author: 'Raja M.', date: '14/08/2020', signed: 'User 1(1/3)', completeby: '14/08/2020' },
//   { title: 'Transport Contract', author: 'Raja M.', date: '14/08/2020', signed: 'User 1(1/3)', completeby: '14/08/2020' },
//   { title: 'Transport Contract', author: 'Raja M.', date: '14/08/2020', signed: 'User 1(1/3)', completeby: '14/08/2020' }
// ];
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private service: DashboardService) { }
  selected1 = 'option3';
  data: any[];
  // tslint:disable-next-line:variable-name
  data_arr = [10, 40, 20, 30];
  labels = [this.data_arr[0], this.data_arr[1], this.data_arr[2], this.data_arr[3]];
  chart;
  chart1;
  chart2;
  // employeesDataSource = array;
  data_arr1 = [];
  color_arr1 = [];
  data_arr2 = [];
  color_arr2 = [];
  eff_percentage = 45;
  process_percentage = 99;
  labels1 = ['Efficiency'];
  labels2 = ['Process'];
  employeesDataSource: MatTableDataSource<any>;
  employeesDisplayColumns: string[] = ['title', 'author', 'date', 'fulfilment', 'signed', 'completeby', 'action'];
  @ViewChild(MatSort, { static: false }) sort: MatSort;
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  // employeesList: Table[] = [];

  ngOnInit(): void {


    this.service.getDB().subscribe(
      (data: Table[]) => {
        console.log(data);
        this.employeesDataSource = new MatTableDataSource(data);
      });
    for (let i = 0; i < 100; i++) {
      this.data_arr1.push(1);
      this.data_arr2.push(1);
      if (i < (this.eff_percentage / 100) * 95) {
        this.color_arr1.push('#ed6c7d');
      }
      else {
        this.color_arr1.push('#e5e5e5');
      }
      if (i < (this.process_percentage / 100) * 95) {
        this.color_arr2.push('#ed6c7d');
      }
      else {
        this.color_arr2.push('#e5e5e5');
      }
    }
    this.chart1 = new Chart('canvas1', {
      type: 'doughnut',
      data: {
        labels: this.labels1,
        datasets: [
          {
            borderWidth: 1,
            data: this.data_arr1,
            backgroundColor: this.color_arr1,
            fill: true
          }
        ]
      },
      options: {

        cutoutPercentage: 88,
        plugins: {
          labels: false
        },

        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      }
    });

    this.chart2 = new Chart('canvas2', {
      type: 'doughnut',
      data: {
        labels: this.labels2,
        datasets: [
          {
            borderWidth: 1,
            data: this.data_arr2,
            backgroundColor: this.color_arr2,
            fill: true
          }
        ]
      },
      options: {

        cutoutPercentage: 88,
        plugins: {
          labels: false
        },

        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      }
    });


    this.chart = new Chart('canvas', {
      type: 'doughnut',
      data: {
        labels: this.labels,

        datasets: [
          {
            borderWidth: 0,
            data: this.data_arr,
            backgroundColor: [
              '#40ed9a',
              '#fb863a',
              '#40a8e2',
              '#485865'
            ],
            fill: true
          }
        ]
      },
      options: {

        cutoutPercentage: 78,
        plugins: {

          labels: {
            render: '%',
            fontColor: '#434343',
            fontSize: 8,
            fontWeight: 500,
            position: 'outside',
            textMargin: 6
          }
        },

        legend: {
          display: false
        },
        scales: {
          xAxes: [{
            display: false
          }],
          yAxes: [{
            display: false
          }],
        }
      }
    });

  }

  applyfilter(filterValue: string): void {
    this.employeesDataSource.filter = filterValue.trim().toLowerCase();
  }
  // tslint:disable-next-line:typedef
  addbutton() {
    this.router.navigate(['document']);
  }

}
