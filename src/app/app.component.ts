import { Component, OnInit } from '@angular/core';
import { PresenceService } from './presence/services/presence.service';
import { AuthenticationDto } from './shared/models/authenticationDtos/authenticationDto';
import { AuthenService } from './authen/services/authen.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Social Chit Chat';

  constructor(private authenService: AuthenService, private presenceSrvice: PresenceService) {
  }

  ngOnInit(): void {
    const authenDto: AuthenticationDto | null = this.authenService.loadCurrentUser();
    if (authenDto !== null) {
      this.presenceSrvice.createHubConnection(authenDto.token);
    }
  }
}
