import { AirlineModule } from './airline.module';

describe('AirlineModule', () => {
  let airlineModule: AirlineModule;

  beforeEach(() => {
    airlineModule = new AirlineModule();
  });

  it('should create an instance', () => {
    expect(airlineModule).toBeTruthy();
  });
});
