import { EtiPipe } from './eti.pipe';

describe('EtiPipe', () => {
  const pipe = new EtiPipe();
  it('create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('transform seconds to hh:mm:ss', () => {
    expect(pipe.transform(57559.8)).toBe('15h 59m 20s');
  });

  it('transform seconds and should add 0 if single digit', () => {
    expect(pipe.transform(25505)).toBe('07h 05m 05s');
  });

  it('transform seconds and should add 00 if no digit', () => {
    expect(pipe.transform(5)).toBe('00h 00m 05s');
  });
});
