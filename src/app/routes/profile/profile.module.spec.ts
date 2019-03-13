import { ProfileModule } from './profile.module';

xdescribe('ProfileModule', () => {
  let profileModule: ProfileModule;

  beforeEach(() => {
    profileModule = new ProfileModule();
  });

  it('should create an instance', () => {
    expect(profileModule).toBeTruthy();
  });
});
