import { MaterialModule } from './material.module';

xdescribe('MaterialModule', () => {
  let materialModule: MaterialModule;

  beforeEach(() => {
    materialModule = new MaterialModule();
  });
  it('should create an instance', () => {
    expect(materialModule).toBeTruthy();
  });
});
