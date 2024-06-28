import { Component, OnInit } from '@angular/core';
import { AuthenService } from './authen/authen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating Love';

  constructor(private authenService: AuthenService) {
  }

  ngOnInit(): void {
    this.authenService.loadCurrentUser();
  }
}
