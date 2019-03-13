import { TestBed } from '@angular/core/testing';
import { FlightModule } from './flights.module';

describe('FlightModule', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ FlightModule ]
        });
    });

    xit(`should not provide 'CustomHttp' service`, () => {
        expect(() => TestBed.get('')).toThrowError(/No provider/);
    });

});
