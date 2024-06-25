import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { AuthenService } from '../authen.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = {} as FormGroup;

  validationErrors?: ValidationErrors[];

  constructor(
    private authen: AuthenService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
  }

  private initForm() {
    this.loginForm = this.fb.group({
      userName: ['',
        [Validators.required, Validators.maxLength(50)]
      ],
      password: ['',
        [Validators.required, Validators.minLength(3)]
      ]
    });
  }

  login(): void {
    this.authen.login(this.loginForm.value).subscribe(() => {
      this.toastr.success('Đăng nhập thành công!');
      this.router.navigate(['/home']);
    }, err => {
      this.validationErrors = err;
    });
  }
}
