import { TestBed } from '@angular/core/testing';
import { TailsModule } from './tails.module';

describe('TailsModule', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [ TailsModule ]
        });
    });

    it(`should not provide 'CustomHttp' service`, () => {
        expect(() => TestBed.get('')).toThrowError(/No provider for/);
    });

});
