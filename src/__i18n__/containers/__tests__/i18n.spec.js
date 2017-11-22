import React from 'react';
import { shallowWithIntl } from 'enzyme-react-intl';
import { shallow, mount } from 'enzyme';
import { createMockStore } from 'redux-test-utils';
import { fromJS } from 'immutable';
import sinon from 'sinon';
import { FormattedMessage, defineMessages } from 'react-intl';
import I18nConected, { I18nContainer } from '../i18n';
import * as localeCore from '../../core';

describe('<I18nContainer />', () => {
  context('when no messages', () => {
    let wrapper;
    const updateMessages = sinon.spy();
    let loadLocaleDataMock;
    beforeAll(() => {
      const children = <h1>TEST</h1>;
      const props = {
        messages: {},
        locale: 'en',
        updateMessages
      };
      loadLocaleDataMock = sinon
        .stub(localeCore, 'loadLocaleData')
        .returns(Promise.resolve(props.messages));
      wrapper = shallow(<I18nContainer {...props}>{children}</I18nContainer>);
    });

    afterAll(() => {
      loadLocaleDataMock.restore();
    });

    it('should be empty if no messages', () => {
      expect(wrapper.text()).to.equal('');
    });
  });

  context('when just mounted', () => {
    let wrapper;
    let loadLocaleDataMock;
    // const updateMessages = jest.fn();
    const updateMessages = sinon.spy();
    const messages = { id: 'test' };
    const children = <h1>TEST</h1>;
    const props = {
      messages: {},
      locale: 'en',
      updateMessages
    };
    beforeAll(() => {
      loadLocaleDataMock = sinon
        .stub(localeCore, 'loadLocaleData')
        .returns(Promise.resolve(messages));
      shallow(<I18nContainer {...props}>{children}</I18nContainer>);
    });

    afterAll(() => {
      loadLocaleDataMock.restore();
    });
    it('should call updateMessages action in componentDidMount', () => {
      // expect(updateMessages).toHaveBeenCalledWith(messages);
      expect(loadLocaleDataMock).to.have.been.called();
      expect(loadLocaleDataMock).to.have.been.calledWith(props.locale);
      expect(updateMessages).to.have.been.called();
      expect(updateMessages).to.have.been.calledWith(messages);
    });
  });

  context('should render translated message', () => {
    let loadLocaleDataMock;
    // const updateMessages = jest.fn();
    const updateMessages = sinon.spy();
    const messages = { id: 'test' };
    let wrapper;

    const props = {
      messages,
      locale: 'en',
      updateMessages
    };
    beforeAll(() => {
      loadLocaleDataMock = sinon
        .stub(localeCore, 'loadLocaleData')
        .returns(Promise.resolve(messages));
      wrapper = shallow(<I18nContainer {...props}><FormattedMessage id="id" /></I18nContainer>);
    });

    afterAll(() => {
      loadLocaleDataMock.restore();
    });
    it('should render with proper translation', () => {
      expect(wrapper).toMatchSnapshot();
    });
    it('should render proper message', () => {
      expect(wrapper.html()).to.equal(`<span>${props.messages.id}</span>`);
    });
  });

  context('should switch language', () => {
    let loadLocaleDataMock;
    const updateMessages = sinon.spy();
    const messages = { id: 'test' };
    let wrapper;

    const props = {
      messages,
      locale: 'en',
      updateMessages
    };
    const newProps = {
      messages: { id: 'тест' },
      locale: 'ru',
      updateMessages
    };
    beforeAll(() => {
      loadLocaleDataMock = sinon
        .stub(localeCore, 'loadLocaleData')
        .onCall(0)
        .returns(Promise.resolve(messages))
        .onCall(1)
        .returns(Promise.resolve(newProps.messages));
    });

    afterAll(() => {
      loadLocaleDataMock.restore();
    });
    it('should render proper message', async () => {
      sinon.spy(I18nContainer.prototype, 'componentDidMount');
      sinon.spy(I18nContainer.prototype, 'componentWillReceiveProps');
      wrapper = shallow(<I18nContainer {...props}><FormattedMessage id="id" /></I18nContainer>);
      expect(I18nContainer.prototype.componentDidMount.calledOnce).to.equal(true);
      await wrapper.setProps(newProps);
      // wrapper.update();
      expect(I18nContainer.prototype.componentWillReceiveProps.calledOnce).to.equal(true);
      expect(loadLocaleDataMock).to.have.been.called();
      // expect(loadLocaleDataMock).to.have.been.calledTwice();
      expect(loadLocaleDataMock).to.have.been.callCount(2);
      expect(loadLocaleDataMock).to.have.been.calledWith(newProps.locale);
      expect(updateMessages).to.have.been.called();
      expect(updateMessages).to.have.been.calledWith(messages);
      expect(wrapper.html()).to.equal(`<span>${newProps.messages.id}</span>`);
    });
  });
});
