import { Component, OnInit } from '@angular/core';
import { AuthenService } from './authen/authen.service';
import { PresenceService } from './presence/presence.service';
import { AuthenticationDto } from './shared/models/authenticationDtos/authenticationDto';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating Love';

  constructor(private authenService: AuthenService, private presenceSrvice: PresenceService) {
  }

  ngOnInit(): void {
    const authenDto: AuthenticationDto | null = this.authenService.loadCurrentUser();
    if (authenDto !== null) {
      this.presenceSrvice.createHubConnection(authenDto);
    }
  }
}
