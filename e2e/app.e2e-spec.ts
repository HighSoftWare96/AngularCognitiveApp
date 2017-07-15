import { AngularCognitiveAppPage } from './app.po';

describe('angular-cognitive-app App', () => {
  let page: AngularCognitiveAppPage;

  beforeEach(() => {
    page = new AngularCognitiveAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
