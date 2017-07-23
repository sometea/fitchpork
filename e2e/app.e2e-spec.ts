import { FitchporkPage } from './app.po';

describe('fitchpork App', () => {
  let page: FitchporkPage;

  beforeEach(() => {
    page = new FitchporkPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
