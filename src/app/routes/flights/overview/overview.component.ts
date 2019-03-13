import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConnectivityService } from '../../../shared/services/airline-flights/connectivity/connectivity.service';
declare var vis: any;
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  @ViewChild('timeline') timelineContainer: ElementRef;
  flightDetails: any;
  isLoading = false;
  selection: any = new SelectionModel<any>(false, []);
  tlContainer: any;
  timeline: any;
  data: any;
  groups: any;
  isError = false;
  options: {};
  kalogdetails: any = {};
  routeParams: any;
  getTailNumber: any;
  labelValueFormat: any;
  constructor(private connectivityService: ConnectivityService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.labelValueFormat = {
      format: 'Date',
      conversionFormat: 'EEEE, MMM dd - hh:mm a',
      upperCase: true
    };
    this.route.parent.params.subscribe(params => {
      this.routeParams = params;
    });
    this.getFlightDetails();
  }

  getFlightDetails() {
    this.flightDetails = [];
    this.isError = false;
    this.isLoading = true;
    this.getTailNumber = null;
    const params = this.routeParams;
    this.connectivityService.getFlightDetails(params).subscribe(list => {
      const response: any = list;

      if (response && response.flightLeg) {
        response.flightLeg.startTime = new Date(response.flightLeg.startTime);
        response.flightLeg.endTime = new Date(response.flightLeg.endTime);
        this.flightDetails['flightNumber'] = response.flightLeg.flightNumber;
        this.flightDetails['flightLegStartTime'] = response.flightLeg.startTime;
        this.flightDetails['flightLegEndTime'] = response.flightLeg.endTime;
        this.flightDetails['arrivalAirport'] = response.flightLeg.arrivalAirport;
        this.flightDetails['departureAirport'] = response.flightLeg.departureAirport;

      }
      this.isLoading = false;
      if (response && !response['error']) {
        const flightPhases = (response.flightPhases && !response.flightPhases.length);
        if (!response['flightLeg'] && flightPhases && (response.kaEvents && !response.kaEvents.length)) {
          this.isError = true;
        } else {
         // this.initializeVISTimeline(response);
          this.getTailNumber = this.routeParams.tailNumber;
          this.flightDetails['tailNumber'] = this.routeParams.tailNumber;
        }
        this.flightDetails['dateFormat'] = {
          format: 'Date',
          conversionFormat: `MM/dd/yyyy HH:mm`,
          timeZone: 'UTC'
        };
        if (!response['flightLeg']) {
          response['flightLeg'] = {};
        }
        this.connectivityService.setFlightNumber(response['flightLeg']);
      } else if (response && response['error']) {
        this.isError = true;
        this.getTailNumber = null;
      }
    });
  }

  initializeVISTimeline(response) {
    this.getTimelineData(response);
    this.getTimelineGroups();
    this.getOptions();
    this.tlContainer = this.timelineContainer.nativeElement;
    this.timeline = new vis.Timeline(this.tlContainer, null, this.options);
    this.timeline.setGroups(this.groups);
    this.timeline.setItems(this.data);
  }

  getTimelineGroups() {
    // create groups
    this.groups = new vis.DataSet([
      { id: 'OpenFlightLeg', content: 'Open Flight Legs' },
      { id: 'ClosedFlightLeg', content: 'Closed Flight Legs' },
      {
        id: 'FlightPhases', content: 'Flight Phases',
        subgroupOrder: function (a, b) {
          return a.subgroupOrder - b.subgroupOrder;
        }
      }
    ]);
  }

  getTimelineData(timelineData) {
    // Create a DataSet (allows two way data-binding)
    // create items
    this.data = new vis.DataSet();
    let id = 1;
    const truck = 1;
    // Add Flight Leg Item
    const flightLeg = timelineData.flightLeg;
    const startTime = moment(new Date(flightLeg.startTime)).format('YYYY-MM-DD hh:mm:ss');
    const endTime = moment(new Date(flightLeg.endTime)).format('YYYY-MM-DD hh:mm:ss');
    if (flightLeg.type === 'OPP') {
      this.data.add({
        id: id,
        group: 'OpenFlightLeg',
        start: flightLeg.startTime,
        end: flightLeg.endTime,
        content: flightLeg.flightNumber + ' - ' + flightLeg.departureAirport + ' > ' + flightLeg.arrivalAirport,
        title: 'Flight Leg Start Time: <strong>' + startTime + '</strong><br>Flight Leg End Time: <strong>' + endTime,
        className: this.getClassName(timelineData.statuses),
        selectable: true
      });
      id++;
      this.data.add({
        id: 2,
        start: '',
        end: '',
        group: 'ClosedFlightLeg',
        title: 'Flight Leg Start Time: <strong>' + startTime + '</strong><br>Flight Leg End Time: <strong>' + endTime,
        className: this.getClassName(timelineData.statuses),
        selectable: true
      });
    }

    if (flightLeg.type === 'CLP') {
      this.data.add({
        id: id,
        start: flightLeg.startTime,
        end: flightLeg.endTime,
        content: flightLeg.flightNumber + ' - ' + flightLeg.departureAirport + ' > ' + flightLeg.arrivalAirport,
        group: 'ClosedFlightLeg',
        title: 'Flight Leg Start Time: <strong>' + startTime + '</strong><br>Flight Leg End Time: <strong>' + endTime,
        className: this.getClassName(timelineData.statuses),
        selectable: true
      });
      id++;
      this.data.add({
        id: 2,
        group: 'OpenFlightLeg',
        start: '',
        end: '',
        content: flightLeg.flightNumber + ' - ' + flightLeg.departureAirport + ' > ' + flightLeg.arrivalAirport,
        title: 'Flight Leg Start Time: <strong>' + startTime + '</strong><br>Flight Leg End Time: <strong>' + endTime,
        className: this.getClassName(timelineData.statuses),
        selectable: true
      });
    }

    // increase id for next item
    id++;

    // Add Flight Phases Items
    const title = 'Flight Phase Start Time: <strong>';
    const flightPhases = timelineData.flightPhases;
    for (let j = 0; j < flightPhases.length; j++) {
      const flightPhase = flightPhases[j];
      const sTime = moment(new Date(flightPhase.startTime)).format('YYYY-MM-DD hh:mm:ss');
      const eTime = moment(new Date(flightPhase.endTime)).format('YYYY-MM-DD hh:mm:ss');
      const desc = flightPhase.flightPhaseDescription ? (' - ' + flightPhase.flightPhaseDescription) : '';
      this.data.add({
        id: id,
        group: 'FlightPhases',
        start: flightPhase.startTime,
        end: flightPhase.endTime,
        content: flightPhase.flightPhaseId + desc,
        title: title + sTime + '</strong><br>Flight Phase End Time: <strong>' + eTime + '</strong>',
        subgroup: this.getFlightPhaseOrder(flightPhase.flightPhaseId)
      });

      // increase id for next item
      id++;
    }
  }

  getClassName(status) {
    let className = 'timeline-flightleg-green';
    if (status.businessClassStatus.toLowerCase() === 'ko' ||
      status.headEndStatus.toLowerCase() === 'ko' ||
      status.firstClassStatus.toLowerCase() === 'ko' ||
      status.systemResetStatus.toLowerCase() === 'ko' ||
      status.economyClassStatus.toLowerCase() === 'ko') {
      className = 'timeline-flightleg-red';
    }
    return className;
  }
  getOptions() {
    // specify options
    this.options = {
      stack: false,
      // start: new Date(),
      showCurrentTime: false,
      clickToUse: true,
      // end: new Date(1000 * 60 * 60 * 24 + (new Date()).valueOf()),
      editable: false,
      margin: {
        item: 10, // minimal margin between items
        axis: 5   // minimal margin between items and the axis
      },
      orientation: 'both'
      // multiselect: true,
      // selectable: true
    };
  }

  getFlightPhaseOrder(flightPhaseId) {
    switch (flightPhaseId) {
      case 6:
        return 4;
      case 7:
        return 3;
      case 8:
        return 2;
      case 9:
        return 1;
      default:
        return flightPhaseId;
    }
  }
}
