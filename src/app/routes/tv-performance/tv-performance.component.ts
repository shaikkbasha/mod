import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TvPerformanceDataService } from '../../shared/services/tv-performance/tv-performance-data.service';
import { AntennaService } from '../../shared/services/tv-performance/antenna/antenna.service';

@Component({
  selector: 'app-tv-performance',
  templateUrl: './tv-performance.component.html',
  styleUrls: ['./tv-performance.component.css']
})
export class TvPerformanceComponent implements OnInit {

  flightDetails: any;

  airlineIcao = '';
  flightId = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private antennaService: AntennaService,
              private dataService: TvPerformanceDataService
  ) {
  }

  ngOnInit() {
    if (this.route.parent) {
      this.route.parent.params.subscribe(params => {
        this.airlineIcao = params['airlineIcao'];
        this.flightId = params['flightId'];
        this.getFlightDetails();
      });
    }
  }

  getFlightDetails() {
    this.antennaService.getFlightDetails(this.airlineIcao, this.flightId).subscribe(res => {
      this.flightDetails = res;
      this.flightDetails['icao'] = this.airlineIcao;
      this.flightDetails['dateFormat'] = {
        format: 'Date',
        conversionFormat: `MM/dd/yyyy HH:mm`,
        timeZone: 'UTC'
      };
      this.dataService.sendData(this.flightDetails);
    }, err => console.log(err));
  }

  isActive(instruction: any[]): boolean {
    // https://stackoverflow.com/questions/39271654/routerlinkactive-for-routerlink-with-parameters-dynamic

    // Set the second parameter to true if you want to require an exact match.
    return this.router.isActive(this.router.createUrlTree(instruction), false);
  }
}
