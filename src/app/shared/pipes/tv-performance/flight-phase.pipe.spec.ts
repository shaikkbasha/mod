import { FlightPhasePipe } from './flight-phase.pipe';

describe('FlightPhasePipe', () => {
  const pipe = new FlightPhasePipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform upperCase with "-" to CamelCase', () => {
    expect(pipe.transform('PRE-FLIGHT')).toBe('Pre-Flight');
  });

  it('transform upperCase without "-" to CamelCase', () => {
    expect(pipe.transform('CRUISE')).toBe('Cruise');
  });

  it('transform upperCase with "-" and space to CamelCase with trim', () => {
    expect(pipe.transform('PRE - FLIGHT')).toBe('Pre-Flight');
  });
});
