import { TvPerformanceModule } from './tv-performance.module';

xdescribe('TvPerformanceModule', () => {
  let tvPerformanceModule: TvPerformanceModule;

  beforeEach(() => {
    tvPerformanceModule = new TvPerformanceModule();
  });

  it('should create an instance', () => {
    expect(tvPerformanceModule).toBeTruthy();
  });
});
