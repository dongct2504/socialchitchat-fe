import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ValidationErrors } from '@angular/forms';
import { environment } from 'src/environments/environment.development';

@Component({
  selector: 'app-test-errors',
  templateUrl: './test-errors.component.html',
  styleUrls: ['./test-errors.component.css']
})
export class TestErrorsComponent implements OnInit {
  private apiUrl = environment.apiUrl;

  validationErrors?: ValidationErrors[];

  constructor(private httpClient: HttpClient) {
  }

  ngOnInit(): void {
  }

  getBadRequest() {
    this.httpClient.get(`${this.apiUrl}/test-errors/badrequest`).subscribe(res => {
      console.log(res);
    });
  }

  getValidationError() {
    this.httpClient.get(`${this.apiUrl}/test-errors/validation-errors`).subscribe(res => {
      console.log(res);
    }, err => {
      this.validationErrors = err;
    });
  }

  getNotFound() {
    this.httpClient.get(`${this.apiUrl}/test-errors/notfound`).subscribe(res => {
      console.log(res);
    });
  }

  getInternalServerError() {
    this.httpClient.get(`${this.apiUrl}/test-errors/internal-server-error`).subscribe(res => {
      console.log(res);
    });
  }
}
