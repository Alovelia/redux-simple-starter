import 'intl';
import 'intl/locale-data/jsonp/en';
import { IntlProvider } from 'react-intl';
import { loadTranslationObject } from 'enzyme-react-intl';
import translations from '../../../src/__i18n__/en.json';

// Load in the desired react-intl translation file.
loadTranslationObject(translations);

// TODO check if it's work
// shallow(<Component />, { context: { intl: IntlContext } })
export default ({ locale = 'en' } = {}) =>
  new IntlProvider({ locale, defaultLocale: 'en' }, {}).getChildContext().intl;
