import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { UserService } from '../../../shared/services/user/user.service';


@Component({
    selector: 'app-home',
    templateUrl: './airline-overview.component.html',
    styleUrls: ['./airline-overview.component.scss']
})
export class AirlineOverviewComponent implements OnInit {

    navigationSubscription;
    currentAirlineId = '';
    constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }
    ngOnInit() {
        if (this.route.parent) {
            this.route.parent.params.subscribe(params => {
                this.currentAirlineId = params['airlineIcao'];
            });
        }
    }
}
