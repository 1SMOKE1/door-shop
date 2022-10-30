import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../admin/auth.service';


const user = {
  email: 'kamyshan19@gmail.com',
  password: 'kamyshan19'
}

@Component({
  selector: 'dsa-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  loginForm: FormGroup = new FormGroup({
    'email': new FormControl('', Validators.required),
    'password': new FormControl('', Validators.required)
  })
  hidePassword: boolean = true;
  constructor(
    private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    if(this.authService.isLoggedIn()){
      this.router.navigate(['admin'])
    }
  }

  submit(): void{
    this.authService.login(this.loginForm.value)
    .subscribe({
      next: () => this.router.navigate(['admin']),
      error: (err) => alert(err.message) 
    })
  }



}
