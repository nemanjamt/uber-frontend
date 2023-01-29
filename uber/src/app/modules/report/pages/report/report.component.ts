import { DatePipe } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ApexAxisChartSeries, ApexChart, ChartComponent } from 'ng-apexcharts';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { UserService } from 'src/app/modules/user/services/user.service';
import { ReportService } from '../../services/report.service';
import { RideReport } from '../../types/RideReport';
import { RideSummaryReport } from '../../types/RideSummaryReport';



export type ChartOptions = {
  series: ApexAxisChartSeries;
  chart: ApexChart;
  // xaxis: ApexXAxis;
  // title: ApexTitleSubtitle;
};
@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {

  maxDate: string = new Date().toISOString().substring(0, 10);
  minDate : string = new Date("1990-01-01").toISOString().substring(0, 10);
  @ViewChild("chart") chart!: ChartComponent;
  public chartOptions: Partial<ChartOptions> | any;
  public chartOptions2: Partial<ChartOptions> | any;
  public chartOptions3: Partial<ChartOptions> | any;
  choosedStartDate!:string;
   choosedEndDate !:string;
   ridesReport: RideReport[] = [];
   rideSummaryReport !: RideSummaryReport ;
   username!:string;
   badUsername : boolean = false;
  constructor(private reportService:ReportService, private datePipe:DatePipe, public authService:AuthService, private userService:UserService) { 
    this.initCharts();  
  }

  initCharts(){
    console.log("123321");
    this.chartOptions = {
      series: [
        {
          name: "ride number",
          data: this.ridesReport.map(r => r.rides)
        },
      ],
      chart: {
        
        type: "line"
      },
      title: {
        text: "ride number"
      },
      
      xaxis: {
        labels: {
          show: false
        },
        categories: this.ridesReport.map(r => this.formatDate(new Date(r.date)))
      }
    };

    this.chartOptions2 = {
      series: [
        
        {
          name:"distance",
          data:this.ridesReport.map(r => r.distance)
        },
      
      ],
      chart: {
        
        type: "line"
      },
      title: {
        text: "distance"
      },
      
      xaxis: {
        labels: {
          show: false
        },
        categories: this.ridesReport.map(r => this.formatDate(new Date(r.date)))
      }
    };

    this.chartOptions3 = {
      series: [
        
        {
          name:"money",
          data:this.ridesReport.map(r => r.revenue),
          stroke: "#ff0000"
        }
      ],
      chart: {
        
        type: "line",
        
      },
      title: {
        text: "money"
      },
      
      xaxis: {
        labels: {
          show: false
        },
        categories: this.ridesReport.map(r => this.formatDate(new Date(r.date)))
      }
    };
  
  }

  formatDate(date: Date): string {
   
    return `${this.datePipe.transform(date, 'dd.MM.yyyy')}`;
  }

  ngOnInit(): void {

  }

  onDateChange(value: string){
    this.choosedStartDate = value;
    if(this.choosedEndDate){
      this.getDates();
    }
  }

  onEndDateChange(value:string){
    this.choosedEndDate = value;
    if(this.choosedStartDate){
      this.getDates();
    }

  }

  getDates(){
    this.username = "";
    this.badUsername = false;
    if(this.authService.isAdmin()){
      this.getDatesAdmin();
    }else if(this.authService.isClient()){
      this.getDatesClient();
    }else{
      this.getDatesDriver();
    }
  }

  getDatesClient(){
    this.reportService.getReportClient({startDate:this.choosedStartDate, endDate:this.choosedEndDate}, this.userService.getCurrentlyLoggedId()).subscribe({
      next:(res)=>{
        this.ridesReport = res.body as RideReport[];
        if(this.ridesReport.length == 0){
          this.ridesReport = [ {
            "date": new Date(this.choosedStartDate).getTime(),
            "rides": 0,
            "distance": 0,
            "revenue": 0
        },
        {
            "date": new Date(this.choosedEndDate).getTime(),
            "rides": 0,
            "distance": 0,
            "revenue": 0
        }];
        }
        this.initCharts();  
      },
      error:(err)=>{

      }
    });
    this.reportService.getReportSummaryClient({startDate:this.choosedStartDate, endDate:this.choosedEndDate}, this.userService.getCurrentlyLoggedId()).subscribe({
      next:(res)=>{
        this.rideSummaryReport = res.body as RideSummaryReport;

      },
      error:(err)=>{

      }
    });
  }

  getDatesAdmin(){
    this.reportService.getReportAdmin({startDate:this.choosedStartDate, endDate:this.choosedEndDate}).subscribe({
      next:(res)=>{
        this.ridesReport = res.body as RideReport[];
        if(this.ridesReport.length == 0){
          this.ridesReport = [ {
            "date": new Date(this.choosedStartDate).getTime(),
            "rides": 0,
            "distance": 0,
            "revenue": 0
        },
        {
            "date": new Date(this.choosedEndDate).getTime(),
            "rides": 0,
            "distance": 0,
            "revenue": 0
        }];
        }
        this.initCharts();  
      },
      error:(err)=>{

      }
    });
    this.reportService.getReportSummaryAdmin({startDate:this.choosedStartDate, endDate:this.choosedEndDate}).subscribe({
      next:(res)=>{
        this.rideSummaryReport = res.body as RideSummaryReport;

      },
      error:(err)=>{

      }
    });
  }

  getDatesDriver(){
    this.reportService.getReportDriver({startDate:this.choosedStartDate, endDate:this.choosedEndDate},this.userService.getCurrentlyLoggedId()).subscribe({
      next:(res)=>{
        this.ridesReport = res.body as RideReport[];
        if(this.ridesReport.length == 0){
          this.ridesReport = [ {
            "date": new Date(this.choosedStartDate).getTime(),
            "rides": 0,
            "distance": 0,
            "revenue": 0
        },
        {
            "date": new Date(this.choosedEndDate).getTime(),
            "rides": 0,
            "distance": 0,
            "revenue": 0
        }];
        }
        this.initCharts();  
      },
      error:(err)=>{

      }
    });
    this.reportService.getReportSummaryDriver({startDate:this.choosedStartDate, endDate:this.choosedEndDate},this.userService.getCurrentlyLoggedId()).subscribe({
      next:(res)=>{
        this.rideSummaryReport = res.body as RideSummaryReport;

      },
      error:(err)=>{

      }
    });
  }

  searchReportUser(){
    this.reportService.getReportByUsername({startDate:this.choosedStartDate, endDate:this.choosedEndDate}, this.username).subscribe({
      next:(res)=>{
        this.ridesReport = res.body as RideReport[];
        if(this.ridesReport.length == 0){
          this.ridesReport = [ {
            "date": new Date(this.choosedStartDate).getTime(),
            "rides": 0,
            "distance": 0,
            "revenue": 0
        },
        {
            "date": new Date(this.choosedEndDate).getTime(),
            "rides": 0,
            "distance": 0,
            "revenue": 0
        }];
        }
        this.initCharts();  
        this.badUsername = false;
      },
      error:(err)=>{
        this.ridesReport = [];
        this.badUsername = true;
        this.initCharts();
      }
    });
    this.reportService.getReportSummaryByUsername({startDate:this.choosedStartDate, endDate:this.choosedEndDate}, this.username).subscribe({
      next:(res)=>{
        this.rideSummaryReport = res.body as RideSummaryReport;
        this.badUsername = false;
      },
      error:(err)=>{
        this.ridesReport = [];
        this.badUsername = true;
        this.initCharts();
      }
    });
  }


}
