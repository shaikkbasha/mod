import { BootstrapModule } from './bootstrap.module';

xdescribe('BootstrapModule', () => {
  let bootstrapModule: BootstrapModule;

  beforeEach(() => {
    bootstrapModule = new BootstrapModule();
  });

  it('should create an instance', () => {
    expect(bootstrapModule).toBeTruthy();
  });
});
