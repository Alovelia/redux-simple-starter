import sinon from 'sinon';

/* eslint-disable global-require */

describe('intl core', () => {
  context('localeLoaders', () => {
    // let mock;
    // const messages = [];
    const locale = 'en';
    const intlLocalesMock = jest.fn();
    const addLocaleDataMock = jest.fn();
    const localeDefaultMock = {
      __esModule: true,
      default: locale,
    };
    const messagesDefaultMock = {
      __esModule: true,
      default: 'messages',
    };

    beforeEach(() => {
      jest.resetModules();
    });

    beforeAll(() => {
      jest.doMock('intl-locales-supported', () => ({
        __esModule: true,
        default: intlLocalesMock,
      }));
      jest.doMock('react-intl', () => ({
        addLocaleData: addLocaleDataMock,
      }));
      jest.doMock('../en.json', () => messagesDefaultMock);
      jest.doMock('react-intl/locale-data/en', () => localeDefaultMock);
    });
    afterAll(() => {
      jest.resetModules();
    });

    it('should call localeLoaders', async () => {
      const core = require('../core');
      const result = await core.localeLoaders[locale]();
      expect(intlLocalesMock).toHaveBeenCalled();
      expect(intlLocalesMock).toHaveBeenCalledWith(locale);
      expect(addLocaleDataMock).toHaveBeenCalled();
      expect(addLocaleDataMock).toHaveBeenCalledWith(localeDefaultMock);
      expect(result).to.equal(messagesDefaultMock);
    });
  });

  context('loadLocaleData + isLocaleSupported', () => {
    let mock;
    const messages = [];
    const locale = 'en';
    const core = require('../core');
    beforeAll(() => {
      mock = sinon.stub(core.localeLoaders, locale).returns(messages);
    });
    afterAll(() => {
      mock.restore();
    });

    it('should call localeLoaders', () => {
      const result = core.loadLocaleData(locale);
      expect(mock).to.have.been.called();
      expect(result).to.equal(messages);
    });

    it('should return true if locale getter is available ', () => {
      const result = core.isLocaleSupported(locale);
      expect(result).to.equal(true);
    });

    it('should return false if locale getter is not available ', () => {
      const result = core.isLocaleSupported('ru');
      expect(result).to.equal(false);
    });
  });

  context('getDefaultLanguage + getLangWithoutRegionCode', () => {
    const mockNavigatorLanguages = ['en-US', 'ru-RU', 'ru', 'en'];
    const navigatorLanguages = global.navigator;

    beforeEach(() => {
      global.navigator = mockNavigatorLanguages;
    });
    afterEach(() => {
      global.navigator = navigatorLanguages;
    });

    const core = require('../core');
    it('should return default user language', () => {
      const result = core.getDefaultLanguage();
      expect(result).to.equal('en-US');
    });
    it('should return default user language - code only', () => {
      const result = core.getLangWithoutRegionCode('en-US');
      expect(result).to.equal('en');
    });
  });
});
