import { TestBed, inject } from '@angular/core/testing';
import { DateFormatterService } from './dateformatter.service';

describe('DateFormatterService', () => {
    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [DateFormatterService]
        });
    });
    it(
        'should get formatted dates',
        inject(
            [ DateFormatterService],
            (formatterService: DateFormatterService) => {
                formatterService.getDates(new Date(), new Date());
            }
        )
    );
});

