import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../Services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;


  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService, private router: Router
  ) { }

  ngOnInit(): void {
    this.addLoginForm();
  }

  addLoginForm(updateInfo?: any): void {
    this.loginForm = this.formBuilder.group({
      email: [(updateInfo) ? updateInfo.email : '', Validators.required],
      password: [(updateInfo) ? updateInfo.password : '', Validators.required]
    });
  }


  submit(): void {
    const data = this.loginForm.value;

    this.authService.getEmployeeLogin(data).subscribe(
      (response: any) => {
        console.log(response);

        if (response.message === 'success') {
          console.log('hello');
          // snackbar with msg success;
          this.router.navigateByUrl('/dashboard'); // routing;
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
