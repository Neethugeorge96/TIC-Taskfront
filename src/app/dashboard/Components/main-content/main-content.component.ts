import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DashboardService } from '../../Services/dashboard.service';
declare var $;
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.css']
})
export class MainContentComponent implements OnInit {

  employeeDetails: any;
  registerfrm: FormGroup;

  constructor(private formBuilder: FormBuilder, private dashboardService: DashboardService) { }

  ngOnInit(): void {

    this.getEmployeeDetails();

  }

  getEmployeeDetails() {

    this.dashboardService.getEmployeeDetails().subscribe(
      (response: any) => {
        if (response.message.toLowerCase() === 'success') {
          this.employeeDetails = response.data;
          console.log(this.employeeDetails);
        } else {
          console.log('getEmployeeDetails API error..!');
        }
      }, error => {
        console.log('getEmployeeDetails API error...!', error);
      }
    );

  }

  addemployee(): void {
    this.addregister();
  }

  addregister(updateInfo?: any): void {
    this.registerfrm = this.formBuilder.group({
      empId: [(updateInfo) ? updateInfo.empId : '', Validators.required],
      empName: [(updateInfo) ? updateInfo.empName : '', Validators.required],
      email: [(updateInfo) ? updateInfo.email : '', Validators.required],
      password: [(updateInfo) ? updateInfo.password : '', Validators.required],
      department: [(updateInfo) ? updateInfo.department : '', Validators.required]
    });
  }
  submit(): void {
    const data = this.registerfrm.value;

    this.dashboardService.saveEmployeeDetails(data).subscribe(
      (response: any) => {
        console.log(response);

        if (response.message.toLowerCase() === 'success') {
          console.log('add to db');
          // snackbar with msg success;
          $('#myModal').modal('hide');
          window.location.reload();

        } else {
          console.log('Invalid Employee');
          // snackbar with msg invalid empng serve
        }
      }, error => {
        console.log('getEmployeeLogin API Error...!', error);
        // snackbar with msg login failed
      });
  }

}
