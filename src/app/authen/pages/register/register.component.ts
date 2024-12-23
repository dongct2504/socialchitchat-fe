import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AbstractControl, FormBuilder, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { AuthenService } from '../../services/authen.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm = {} as FormGroup;

  validationErrors?: string[];
  maxDate?: Date;

  constructor(
    private authenService: AuthenService,
    private router: Router,
    private toastr: ToastrService,
    private fb: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 17);
  }

  private initForm() {
    this.registerForm = this.fb.group({
      userName: ['',
        [Validators.required, Validators.maxLength(50)]
      ],
      email: ['',
        [Validators.required, Validators.maxLength(128)]
      ],
      nickname: ['',
        [Validators.required, Validators.maxLength(50)]
      ],
      phoneNumber: ['',
        [Validators.required]
      ],
      dateOfBirth: ['',
        [Validators.required]
      ],
      gender: [1,
        [Validators.required]
      ],
      password: ['',
        [Validators.required, Validators.minLength(3)]
      ],
      confirmPassword: ['',
        [Validators.required, this.matchValues('password')]
      ]
    });

    this.registerForm.controls['password'].valueChanges.subscribe(() => {
      this.registerForm.controls['confirmPassword'].updateValueAndValidity();
    });
  }

  register() {
    this.authenService.register(this.registerForm.value).subscribe(() => {
      this.toastr.success('Đăng ký thành công!');
      this.router.navigate(['/authen/login']);
    }, err => {
      this.validationErrors = err;
    });
  }

  private matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup = control?.parent as FormGroup;
      if (!formGroup) {
        return null;
      }
      const matchControl = formGroup.controls[matchTo];
      return control.value === matchControl?.value ? null : { isMatching: true };
    };
  }
}
