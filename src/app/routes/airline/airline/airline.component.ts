import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user/user.service';
import { AirlineService } from '../../../shared/services/admin/airline/airline.service';
@Component({
  selector: 'app-airline',
  templateUrl: './airline.component.html',
  styleUrls: ['./airline.component.css']
})
export class AirlineComponent implements OnInit, OnDestroy {

  navigationSubscription;
  currentAirline = '';
  currentAirlineId = '';

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService,
private airlineService: AirlineService) {
  }

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });

    this.loadData();

    // get user info from userService
    // this.userService.userInfo.subscribe((event: any) => {
    //   if (Object.keys(event).length) {
    //     if (!this.userService.hasAirlineAccess(this.currentAirlineId)) {
    //       this.router.navigate(['access-denied']);
    //     }
    //   }
    // });
  }

  loadData() {
    this.currentAirlineId = this.route.snapshot.paramMap.get('airlineIcao');
    this.airlineService.getAirlineByIcao(this.currentAirlineId)
      .subscribe(airline => {
        const data: any = airline;
        if (!data.error) {
          this.currentAirline = data[0].name;
        }
        if (data.status === 404) {
          // Airline doesn't exists
          this.router.navigate(['not-found']);
        } else if (data.status === 403) {
          // Sorry don't have access to this page
          this.router.navigate(['access-denied']);
        }
      });
  }

  ngOnDestroy() {
    // avoid memory leaks here by cleaning up after ourselves. If we
    // don't then we will continue to run our initialiseInvites()
    // method on every navigationEnd event.
    if (this.navigationSubscription) {
      this.navigationSubscription.unsubscribe();
    }
  }

  isActive(instruction: any[]): boolean {
    // https://stackoverflow.com/questions/39271654/routerlinkactive-for-routerlink-with-parameters-dynamic

    // Set the second parameter to true if you want to require an exact match.
    return this.router.isActive(this.router.createUrlTree(instruction), false);
  }

  isDropdownItemActive(instructions: any[][]): boolean {
    // https://stackoverflow.com/questions/39271654/routerlinkactive-for-routerlink-with-parameters-dynamic

    for (let i = 0; i < instructions.length; i++) {

      const isLinkActive = this.router.isActive(this.router.createUrlTree(instructions[i]), false);
      if (isLinkActive) {
        return true;
      }
    }

    return false;
  }
}
