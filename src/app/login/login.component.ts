import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms'
import { AuthService } from '../auth/auth.service';
import {Router} from '@angular/router'
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm = new FormGroup({
    username: new FormControl(''),
    password: new FormControl('')
  })

  constructor(private auth: AuthService, private router: Router) { }

  // sends form data on login
  onSubmit() {
    const username = this.loginForm.get('username').value
    const password = this.loginForm.get('password').value
    

    this.auth.login(username, password).then(val => {
     if (val === true){
      this.router.navigate(['/dashboard'])
     }
    })
    
  }

  ngOnInit() {
  }

}
