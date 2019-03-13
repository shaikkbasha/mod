import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';

@Component({
  selector: 'art-focused-object-header',
  templateUrl: './artfocusedobjectheader.component.html'
})
export class ArtfocusedobjectheaderComponent implements OnInit {
  currentAirlineId = 'QTR';
  navigationSubscription;
  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit() {
    this.navigationSubscription = this.router.events.subscribe((event: any) => {
      // If it is a NavigationEnd event re-initialize the component
      if (event instanceof NavigationEnd) {
        this.loadData();
      }
    });

    this.loadData();
  }
  loadData() {
    this.currentAirlineId = this.route.snapshot.paramMap.get('airlineIcao');
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
