import { HomeModule } from './home.module';

xdescribe('HomeModule', () => {
  let homeModule: HomeModule;

  beforeEach(() => {
    homeModule = new HomeModule();
  });

  it('should create an instance', () => {
    expect(homeModule).toBeTruthy();
  });
});
