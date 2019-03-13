import { AfterViewInit, Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { ConnectivityService } from '../../../shared/services/airline-flights/connectivity/connectivity.service';
declare var vis: any;
import { SelectionModel } from '@angular/cdk/collections';
import { ActivatedRoute, Router } from '@angular/router';
import * as moment from 'moment-timezone';

@Component({
  selector: 'app-connectivity',
  templateUrl: './connectivity.component.html',
  styleUrls: ['./connectivity.component.css']
})
export class ConnectivityComponent implements OnInit, AfterViewInit {

  @ViewChild('timeline') timelineContainer: ElementRef;
  isLoading = false;
  actionToolBarConfig = {
    createLabel: '',
    moduleName: 'antenna',
    id: '',
    enableSearch: true,
    enableCreate: false,
    filterIds: {
      filterListId: 'filter-antenna-list',
      filterText: 'inp-filter-antenna-text'
    },
    buttonList: []
  };
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
  flightDetails: any;
  constructor(private connectivityService: ConnectivityService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.labelValueFormat = {
      format: 'Date',
      conversionFormat: `MM/dd/yyyy HH:mm`,
      timeZone: 'UTC'
    };
    this.route.parent.params.subscribe(params => {
      this.routeParams = params;
    });
    this.getKAlogevent();
  }

  getKAlogevent() {
    this.isError = false;
    this.isLoading = true;
    this.getTailNumber = null;
    const params = this.routeParams;
    this.connectivityService.getKAlogDetails(params).subscribe(list => {
      const response: any = list;
      // if (response && response.flightPhases) {
      //   response.flightPhases.forEach((val, key) => {
      //     val.startTime = val.startTime;
      //     val.endTime = val.endTime;
      //   });
      // }

      // if (response && response.kaEvents) {
      //   response.flightPhases.forEach((val, key) => {
      //     val.eventTime = val.eventTime;
      //   });
      // }
      this.isLoading = false;
      if (response && !response['error']) {
        const flightPhases = (response.flightPhases && !response.flightPhases.length) ;
        if (!response['flightLeg'] && flightPhases && (response.kaEvents && !response.kaEvents.length)) {
          this.isError = true;
        } else {
          this.getTailNumber = this.routeParams.tailNumber;
          this.initializeVISTimeline(response);
        }
        if (!response['flightLeg']) {
          response['flightLeg'] = {};
        }
        this.kalogdetails = response['flightLeg'];
        this.flightDetails = {
          tailNumber: this.getTailNumber,
          flightNumber: this.kalogdetails.flightNumber,
          departureAirport: this.kalogdetails.arrivalAirport,
          arrivalAirport: this.kalogdetails.departureAirport,
          flightLegStartTime: this.kalogdetails.startTime,
          flightLegEndTime: this.kalogdetails.endTime,
          dateFormat: {
            format: 'Date',
            conversionFormat: `MM/dd/yyyy HH:mm`,
            timeZone: 'UTC'
          }
        };
        this.connectivityService.setFlightNumber(response['flightLeg']);
      } else if (response && response['error']) {
        this.isError = true;
        this.getTailNumber = null;
      }
    });
  }

  ngAfterViewInit() {
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
        {id: 'FlightLeg', content: 'Flight Leg'},
        {id: 'FlightPhases', content: 'Flight Phases',
          subgroupOrder : function (a, b) {
            return a.subgroupOrder - b.subgroupOrder;
          }
        },
        {id: 'KaOperStat', content: 'Ka Oper Stat'},
        {id: 'CRUSatAuthenticated', content: 'CRUS at Authenticated'},
        {id: 'CRUSatDhcpComplete', content: 'CRUS at Dhcp Complete'},
        {id: 'LkmsConnect', content: 'Lkms Connect'},
        {id: 'HotspotEnable', content: 'Hotspot Enable'},
        {id: 'InternetEnable', content: 'Internet Enable'},
        {id: 'IntranetStatus', content: 'Intranet Status'},
        {id: 'InternetStatus', content: 'Internet Status'},
        {id: 'KAMCommFault', content: 'KAM Comm Fault'},
        {id: 'ASUCommFault', content: 'ASU Comm Fault'},
        {id: 'ASUPortalCommFault', content: 'ASUPortalCommFault'},
        {id: 'WAPCommStatus1', content: 'WAP Comm Status 1'},
        {id: 'WAPCommStatus2', content: 'WAP Comm Status 2'},
        {id: 'WAPCommStatus3', content: 'WAP Comm Status 3'},
        {id: 'PlayReadyCommFault', content: 'Play Ready Comm Fault'},
        {id: 'ProxyCommFault', content: 'Proxy Comm Fault'},
        {id: 'WideVineCommFault', content: 'Wide Vine CommFault'},
        {id: 'CRURestart', content: 'CRU Restart'},
        {id: 'ASURestart', content: 'ASU Restart'},
        {id: 'SwitchCommFault', content: 'Switch Comm Fault'},
        {id: 'PsdCommFault', content: 'Psd Comm Fault'}
    ]);
    }

  getTimelineData(timelineData) {
      // Create a DataSet (allows two way data-binding)
    // create items
    this.data = new vis.DataSet();
    // const count = 100;
    let id = 1;
    const truck = 1;
    // const max: any = 0.02;

    // Add Flight Leg Item
    const flightLeg = timelineData.flightLeg;
    const startTime = moment.utc(flightLeg.startTime).format('YYYY-MM-DD HH:mm:ss');
    const endTime = moment.utc(flightLeg.endTime).format('YYYY-MM-DD HH:mm:ss');
    this.data.add({
        id: id,
        group: 'FlightLeg',
        start: flightLeg.startTime,
        end: flightLeg.endTime,
        content: flightLeg.flightNumber + ' - ' + flightLeg.departureAirport + ' > ' + flightLeg.arrivalAirport,
        title: 'Flight Leg Start Time: <strong>' + startTime + '</strong><br>Flight Leg End Time: <strong>' + endTime,
        className: 'timeline-flightleg',
        selectable: true
    });

     // increase id for next item
     id++;

    // Add Flight Phases Items
    const title = 'Flight Phase Start Time: <strong>';
    const flightPhases = timelineData.flightPhases;
    for (let j = 0; j < flightPhases.length; j++) {
      const flightPhase = flightPhases[j];
      const sTime = moment.utc(flightPhase.startTime).format('YYYY-MM-DD HH:mm:ss');
      const eTime = moment.utc(flightPhase.endTime).format('YYYY-MM-DD HH:mm:ss');
      const desc = flightPhase.flightPhaseDescription ? (' - ' + flightPhase.flightPhaseDescription ) : '';
      this.data.add({
          id: id,
          group: 'FlightPhases',
          start: flightPhase.startTime,
          end: flightPhase.endTime,
          content: flightPhase.flightPhaseId + desc,
          title:  title + sTime + '</strong><br>Flight Phase End Time: <strong>' + eTime + '</strong>',
          subgroup: this.getFlightPhaseOrder(flightPhase.flightPhaseId)
      });

      // increase id for next item
      id++;
    }

     // Add Ka Event Items
     const kaEvents = timelineData.kaEvents;
     for (let j = 0; j < kaEvents.length; j++) {
        const type = 'Event Type: <strong>' + kaEvents[j].eventType + '</strong><br>Event Data: <strong>';
         const kaEvent = kaEvents[j];
         const eTime = moment.utc(kaEvent.eventTime).format('YYYY-MM-DD HH:mm:ss');
         const getEvent = this.getIconClassName(kaEvent.eventName, kaEvent.eventData);
         this.data.add({
             id: id,
             type: 'point',
             group: kaEvent.eventName,
             start: kaEvent.eventTime,
            //  content: kaEvent.eventData, // Step #1
            //  content: this.getIconClassName(kaEvent.eventName, kaEvent.eventData),  // Step #2
             title: type + kaEvent.eventData + ' - ' + getEvent.description + '</strong><br>Event Time: <strong>' + eTime + '</strong>',
             className: getEvent.color
         });
         // increase id for next item
         id++;
     }
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
      orientation: 'both',
      moment: function(date) {
        return vis.moment(date).utc();
      }
      // multiselect: true,
      // selectable: true
    };
  }

  getFlightPhaseOrder(flightPhaseId) {
    switch (flightPhaseId) {
      // case 1:
      //     return 5;
      // case 2:
      //     return 4;
      // case 3:
      //     return 3;
      // case 4:
      //     return 2;
      // case 5:
      //     return 1;
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

  getIconClassName(eventName, eventData) {
    const red = 'vis-item-red';
    const green = 'vis-item-green';
    let icon: any = {};
    const iconObj = [
      {
        eventName: 'CRURestart',
        eventData: [{data: 1, description: 'Restart Occurred', color: red}, {data: 0, description: 'Normal', color: green}]
      },
      {
        eventName: 'HotspotEnable',
        eventData: [{data: 1, description: 'Enabled', color: green}, {data: 0, description: 'Disabled', color: red}]
      },
      {
        eventName: 'SwitchCommFault',
        eventData: [{data: 1, description: 'Fault', color: red}, {data: 0, description: 'Normal', color: green}]
      },
      {
        eventName: 'PsdCommFault',
        eventData: [{data: 1, description: 'Fault', color: red}, {data: 0, description: 'Normal', color: green}]
      },
      {
        eventName: 'LkmsConnect',
        eventData: [{data: 1, description: 'Up', color: green}, {data: 0, description: 'Down', color: red}]
      },
      {
        eventName: 'IntranetStatus',
        eventData: [{data: 1, description: 'Up', color: green}, {data: 0, description: 'Down', color: red}]
      },
      {
        eventName: 'InternetStatus',
        eventData: [{data: 1, description: 'Up', color: green}, {data: 0, description: 'Down', color: red}]
      },
      {
        eventName: 'InternetEnable',
        eventData: [{data: 1, description: 'Enabled', color: green}, {data: 0, description: 'Disabled', color: red}]
      },
      {
        eventName: 'CRUSatAuthenticated',
        eventData: [{data: 1, description: 'CRU received ground auth', color: green},
        {data: 0, description: 'CRU did not receive ground auth', color: red}]
      },
      {
        eventName: 'CRUSatDhcpComplete',
        eventData: [{data: 1, description: 'successfully requested an IP using DHCP over satellite', color: green},
        {data: 0, description: 'failed', color: red}]
      },
      {
        eventName: 'KAMCommFault',
        eventData: [{data: 1, description: 'Fault', color: red}, {data: 0, description: 'Normal', color: green}]
      },
      {
        eventName: 'PlayReadyCommFault',
        eventData: [{data: 1, description: 'Fault', color: red}, {data: 0, description: 'No Fault', color: green}]
      },
      {
        eventName: 'WideVineCommFault',
        eventData: [{data: 1, description: 'Fault', color: red}, {data: 0, description: 'No Fault', color: green}]
      },
      {
        eventName: 'ProxyCommFault',
        eventData: [{data: 1, description: 'Fault', color: red}, {data: 0, description: 'No Fault', color: green}]
      },
      {
        eventName: 'ASUCommFault',
        eventData: [{data: 1, description: 'Fault', color: red}, {data: 0, description: 'No Fault', color: green}]
      },
      {
        eventName: 'ASUPortalCommFault',
        eventData: [{data: 1, description: 'Fault', color: red}, {data: 0, description: 'No Fault', color: green}]
      },
      {
        eventName: 'ASURestart',
        eventData: [{data: 1, description: 'Restart Occurred ', color: red}, {data: 0, description: 'Normal', color: green}]
      },
      {
        eventName: 'WAPCommFault',
        eventData: [{data: 1, description: 'Fault', color: red}, {data: 0, description: 'No Fault', color: green}]
      },
    ];

    iconObj.forEach((value, index) => {
        if (value.eventName.toLowerCase() === eventName.toLowerCase()) {
          value.eventData.forEach((event, innerindex) => {
              if (parseFloat(event.data.toString()) === parseFloat(eventData)) {
                icon = event;
              }
          });
        }
    });
    // const eventIcon = '<i class="fa fa-exclamation-circle fa-2x"></i>';
    return icon;
  }

  antennaFilter(data) {
    console.log(data);
  }

  getEvent(data) {
    console.log(data);
  }
}
