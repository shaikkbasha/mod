import { ArtefactModule } from './artefact.module';

xdescribe('ArtefactModule', () => {
  let artefactModule: ArtefactModule;

  beforeEach(() => {
    artefactModule = new ArtefactModule();
  });

  it('should create an instance', () => {
    expect(artefactModule).toBeTruthy();
  });
});
