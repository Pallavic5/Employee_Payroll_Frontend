import { Component } from '@angular/core';
import { Employee } from 'src/app/model/Employee';
import { HttpService } from '../../service/http.service';
import { Router } from '@angular/router';
import { DataService } from 'src/app/service/data-service';
 


@Component({
  selector: 'app-home-page',
  template: '<app-add-employee [employeeData]="employee"></app-add-employee>',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent {
  employeeCount: number = 0;
  employeeList: Employee[] = [] 
constructor(private httpService: HttpService,
  private router: Router,
              private dataService: DataService){}

ngOnInit(): void{
  this.httpService.getEmployeeData().subscribe(response => {
    this.employeeList = response.data;
    this.employeeCount = this.employeeList.length;
    console.log(this.employeeList);
  });
}

remove(empId: number): void {
  console.log(empId)
  this.httpService.deleteEmployeeData(empId).subscribe(response => {
    console.log(response);
    this.ngOnInit();
  });
}

update(Employee: Employee): void {
  this.dataService.changeEmployee(Employee);
  this.router.navigateByUrl('/add-employee/' + Employee.id);
  this.httpService.updateEmployeData(Employee.id, Employee).subscribe(response => {
    console.log(response);
    this.ngOnInit();
  });
}
}
