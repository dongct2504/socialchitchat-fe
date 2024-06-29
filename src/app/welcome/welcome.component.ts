import { Component, OnInit } from '@angular/core';
import { AuthenService } from '../authen/authen.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  constructor(private authenService: AuthenService, private router: Router) {
  }

  ngOnInit(): void {
    if (this.authenService.isLoggedIn()) {
      this.router.navigate(['/home']);
    }
  }
}
