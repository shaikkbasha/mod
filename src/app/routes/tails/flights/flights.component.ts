import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FlightsService } from '../../../shared/services/airline-tail/flights/flights.service';

@Component({
  selector: 'app-flights',
  templateUrl: './flights.component.html',
  styleUrls: ['./flights.component.css']
})
export class FlightsComponent implements OnInit, OnDestroy {
  navigationSubscription;

  currentAirlineId = 'QTR';
  tailNumber = '';

  constructor(private flightsService: FlightsService, private route: ActivatedRoute, private router: Router) {
  }

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      // If it is a NavigationEnd event re-initalise the component
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });

    this.loadData();
  }

  loadData() {
    this.currentAirlineId = this.route.snapshot.paramMap.get('airlineIcao');
    this.tailNumber = this.route.snapshot.paramMap.get('tailNumber');
    console.log('FlightsComponent#loadData - currentAirlineId: ', this.currentAirlineId);
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
