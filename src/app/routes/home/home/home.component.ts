import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/services/user/user.service';
import { User } from '../../../shared/services/user/user';
import { AirlineService } from '../../../shared/services/admin/airline/airline.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  airlineList = [];
  userDetails: User;
  isUserAuthenticated = false;
  isLoading = false;
  constructor(private userService: UserService,
    private airlineService: AirlineService) { }

  ngOnInit() {
    this.isLoading = false;
    this.getUser();
    this.getUserAirline();
  }

  getUser() {
    this.userService.identity().then((user) => {
      console.log('userblock#getUser: ', user);
      this.userDetails = user;
      this.isUserAuthenticated = true;
    });
  }

  getUserAirline() {
    this.isLoading = true;
    this.airlineService.getAirlineForUser().subscribe(list => {
      this.isLoading = false;
      if (list && list.length) {
      list.forEach(value => {
        if (value.icao) {
          this.airlineList.push(value);
        }
      });
    }
    });

  }
}
