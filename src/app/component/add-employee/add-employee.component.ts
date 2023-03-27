import { Component,OnInit } from '@angular/core';
import { FormGroup,FormBuilder,FormArray,FormControl,Validators} from '@angular/forms';
import { Employee } from 'src/app/model/Employee';
import { DataService } from 'src/app/service/data-service';
import { HttpService } from 'src/app/service/http.service';
import { Router } from '@angular/router';
import { MatCheckboxChange } from '@angular/material/checkbox';



@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.scss']
})
export class AddEmployeeComponent{
 public employee : Employee = new Employee();
  employeeForm!: FormGroup;


  departments: Array<any> = [
    { id: 1, name: "HR", value: "HR", checked: false },
    { id: 2, name: "Sales", value: "Sales", checked: false },
    { id: 3, name: "Finance", value: "Finance", checked: false  },
    { id: 4, name: "Engineer", value: "Engineer", checked: false },
    { id: 5, name: "Other", value: "Other", checked: false }
  ]

  constructor(private formBuilder: FormBuilder,
    private httpService: HttpService,
              private dataService: DataService,
              private router: Router){

    this.employeeForm = this.formBuilder.group({
        name: new FormControl('', [Validators.required, Validators.maxLength(30),Validators.minLength(3)]),
        profilePic: new FormControl('',[Validators.required]),
        gender: new FormControl('',[Validators.required]),
        salary: new FormControl('',[Validators.required]),
        startDate: new FormControl('',[Validators.required]),
        note: new FormControl('',[Validators.required]),
        department: new FormArray([])
      })
  
  }

  ngOnInit(): void {
    console.log(this.employee);
  }

   /**
   * On change event for checkbox. In this we can select multiple checkobox 
   * for department and store is as an array.
   * @param event 
   */
   onCheckboxChange(event:  MatCheckboxChange) {
    const department: FormArray = this.employeeForm.get('department') as FormArray;

    if (event.checked) {
      department.push(new FormControl(event.source.value));
      console.log(department);
    } else {
      const index = department.controls.findIndex(x => x.value === event.source.value);
      department.removeAt(index);
    }
  }


  
  submitForm(){
      // console.log(this.employeeForm.value)
      this.employee = this.employeeForm.value;
    // console.log(this.employeeFormGroup);
    console.log(this.employee);
    this.httpService.addEmployee(this.employee).subscribe(response => {
    console.log(response);
    this.router.navigateByUrl("/home-page");
    });
  }
  
// public myError = {controlName: string, errorName: string} => {
//   return this.employeeForm.controls[controlName].hasError(errorName);
// }


}
