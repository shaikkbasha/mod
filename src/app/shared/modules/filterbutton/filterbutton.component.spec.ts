import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterButtonComponent } from './filterbutton.component';

describe('FilterbuttonComponent', () => {
  let component: FilterButtonComponent;
  let fixture: ComponentFixture<FilterButtonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should be defined ngOnChanges', () => {
    component.filterData = [
      { title: 'All Flights', filterValue: 'all', filterKey: 'offloadReceived' },
      { title: 'OFFLOAD RECEIVED', filterValue: 'yes', filterKey: 'offloadReceived' },
      { title: 'OFFLOAD MISSING', filterValue: 'no', filterKey: 'offloadReceived' }
    ];
    component.datasource = [
      {
        data :
          [
            {arrivalAirport: 'LAX',
              arrivalDate: '2018-12-16T13:45:00.000Z',
              departureAirport: 'HNL',
              departureDate: '2018-12-16T08:43:13.000Z',
              flightNumber: 'AAL298',
              offloadReceived: 'NO',
              tailNumber: 'N123NN'
            }
          ]
      }];
    expect(component.loadingStatus).toBeFalsy();
    expect(component.ngOnChanges).toBeDefined();
  });
  it('resetFilterData should be defined', () => {
    component.filterData = [
      { title: 'All Flights', filterValue: 'all', filterKey: 'offloadReceived', count: 0, datasource: [] },
      { title: 'RECEIVED OFFLOADS', filterValue: 'yes', filterKey: 'offloadReceived', count: 0, datasource: [] }
    ];
    component.resetFilterData();
  });
  it('getActiveWidget should be defined', () => {
    const item = [
      {
        datasource: []
      }
    ];
    component.datasource = {
      isFiltered: []
    };
    component.activeWidgetObj.activeWidget = 1;
    component.activeWidgetObj.changeActivatedWidgetStyle = 0;
    component.getActiveWidget(1, item);
  });
  it('ngOnChanges should be defined', () => {
    component.filterData = [
      { title: 'All Flights', filterValue: 'all', filterKey: 'offloadReceived', count: 0, datasource: [] },
      { title: 'RECEIVED OFFLOADS', filterValue: 'yes', filterKey: 'offloadReceived', count: 0, datasource: [] }
    ];
    component.datasource = {
      isFiltered: []
    };
    component.ngOnChanges();
  });
  it('ngOnChanges when isFiltered is empty', () => {
    component.filterData = [
      { title: 'All Flights', filterValue: 'all', filterKey: 'offloadReceived', count: 0, datasource: [] },
      { title: 'RECEIVED OFFLOADS', filterValue: 'yes', filterKey: 'offloadReceived', count: 0, datasource: [] }
    ];
    component.datasource = {
      isFiltered: false
    };
    component.isloading = true;
    component.ngOnChanges();
    expect(component.loadingStatus).toBeTruthy();
    component.datasource.isFiltered = false;
    component.datasource.data = [{
      'tailNumber': 'N996NN',
      'flightNumber': 'AAL2307',
      'departureDate': '2019-01-22T00:34:46.000Z',
      'arrivalDate': '2019-01-22T01:21:19.000Z',
      'departureAirport': 'LAS',
      'rssi': 'high',
      'offloadReceived': 'NO'
    }];
    component.ngOnChanges();
    component.isloading = false;
    component.datasource.isFiltered = false;
    component.ngOnChanges();
    expect(component.datasource.isFiltered).toBeFalsy();
    component.filterData = [
      {
        'title': 'ALL FLIGHTS',
        'filterValue': 'high',
        'filterKey': 'rssi',
        'count': null,
        'datasource': [
        ]
      }
    ];
    component.ngOnChanges();
    component.filterData = [
        {
          'title': 'HIGH RSSI',
          'filterValue': 'high',
          'filterKey': 'rssi',
          'count': 0,
          'datasource': []
        },
        {
          'title': 'LOW RSSI',
          'filterValue': 'low',
          'filterKey': 'rssi',
          'count': 0,
          'datasource': []
        },
        {
          'title': 'EXTRA LOW RSSI',
          'filterValue': 'extralow',
          'filterKey': 'rssi',
          'count': 0,
          'datasource': []
        },
        {
          'title': 'BAD ANTENNA',
          'filterValue': 'badAntenna',
          'filterKey': 'antennaState',
          'count': 0,
          'datasource': []
        }
    ];
    component.datasource.data = [
      {
        'timeStamp': '2018-05-23T21:43:48Z',
        'antennaType': 'EMS',
        'eti': '',
        'latitude': '0.0',
        'longitude': '0.0',
        'altitude': 0,
        'rssi': 10,
        'heading': 0,
        'speed': 0,
        'antennaState': '',
        'commState': 'GOOD',
        'azimuth': 0,
        'elevation': 0,
        'unixTime': '2018-05-23T21:42:25Z',
        'controllerState': '',
        'flightPhaseId': 1,
        'event': ''
      },
      {
        'timeStamp': '2018-05-23T21:43:48Z',
        'antennaType': 'EMS',
        'eti': '',
        'latitude': '0.0',
        'longitude': '0.0',
        'altitude': 0,
        'rssi': -24,
        'heading': 0,
        'speed': 0,
        'antennaState': '',
        'commState': 'GOOD',
        'azimuth': 0,
        'elevation': 0,
        'unixTime': '2018-05-23T21:42:25Z',
        'controllerState': '',
        'flightPhaseId': 1,
        'event': ''
      },
      {
        'timeStamp': '2018-05-23T21:43:48Z',
        'antennaType': 'EMS',
        'eti': '',
        'latitude': '0.0',
        'longitude': '0.0',
        'altitude': 0,
        'rssi': -23,
        'heading': 0,
        'speed': 0,
        'antennaState': '',
        'commState': 'GOOD',
        'azimuth': 0,
        'elevation': 0,
        'unixTime': '2018-05-23T21:42:25Z',
        'controllerState': '',
        'flightPhaseId': 1,
        'event': ''
      }
    ];
    component.ngOnChanges();
  });
  it('should define formFilterData event', () => {
    const data = {
      'tailNumber': 'N996NN',
      'flightNumber': 'AAL2307',
      'departureDate': '2019-01-22T00:34:46.000Z',
      'arrivalDate': '2019-01-22T01:21:19.000Z',
      'departureAirport': 'LAS',
      'arrivalAirport': 'LAX',
      'offloadReceived': 'NO'
    };
    component.filterData = [{
      'title': 'RECEIVED OFFLOADS',
      'filterValue': 'yes',
      'filterKey': 'offloadReceived',
      'count': 0,
      'datasource': [
      ]
    }];
    component.formFilterData(0, data);
    component.filterData[0].count = null;
    component.formFilterData(0, data);
  });

  it('should execute getActiveWidget', () => {
    component.activeWidgetObj = {
      activeWidget: 2,
      changeActivatedWidgetStyle: 1,
      isHovered: true
    };
    component.datasource = {};
    const item = [
      {
        datasource: []
      }
    ];
    const spy = spyOn(component, 'selectToFilter').and.callThrough();
    component.getActiveWidget(1, item);
    expect(component.activeWidgetObj.activeWidget).toBe(1);
    expect(component.activeWidgetObj.isHovered).toBe(null);
    expect(spy).toHaveBeenCalled();
  });

  it('should execute changeActivatedWidgetStyle', () => {
    component.activeWidgetObj = {
      activeWidget: 2,
      changeActivatedWidgetStyle: 1,
      isHovered: true
    };
    component.datasource = {};
    const item = [
      {
        datasource: []
      }
    ];
    component.getActiveWidget(2, item);
    expect(component.activeWidgetObj.changeActivatedWidgetStyle).toBe(2);
  });
});
