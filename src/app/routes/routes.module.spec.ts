import { RoutesModule } from './routes.module';

xdescribe('RoutesModule', () => {
  let routesModule: RoutesModule;

  beforeEach(() => {
    routesModule = new RoutesModule();
  });

  it('should create an instance', () => {
    expect(routesModule).toBeTruthy();
  });
});
