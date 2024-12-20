import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/authen/services/authen.service';

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
