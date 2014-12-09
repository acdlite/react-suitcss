'use strict';

import { jsdom } from 'jsdom';
global.document = jsdom('');
global.window = document.parentWindow;
global.navigator = {};
navigator.userAgent = 'node';

import { expect } from 'chai';

describe('SuitCSS', function() {
  import React from 'react/addons';
  let {TestUtils} = React.addons;

  import SuitCSS from '../SuitCSS';

  let component = TestUtils.renderIntoDocument(
    <SuitCSS
      {...this.props}
      componentName="Component"
      modifiers={[
        'dark',
        'light',
      ]}
      states={[
        'open',
        'closed'
      ]}

      dark
      light
      gray

      isOpen
      isClosed
      isStuckInTheMiddle

      id="foobar"
      className="foo bar"
    >
      <div className="child" />
    </SuitCSS>
  );

  let buttonComponent = TestUtils.renderIntoDocument(
    <SuitCSS
      componentName="ButtonComponent"
      element="button"
    />
  );

  let componentEl = component.getDOMNode();
  let buttonComponentEl = buttonComponent.getDOMNode();

  it('has base class', function() {
    expect(elementHasClass(componentEl, 'Component')).to.be.true;
  });

  it('has modifier classes', function() {
    expect(elementHasClass(componentEl, 'Component--dark')).to.be.true;
    expect(elementHasClass(componentEl, 'Component--light')).to.be.true;
    expect(elementHasClass(componentEl, 'Component--gray')).to.be.false;

    expect(elementHasClass(componentEl, 'is-dark')).to.be.false;
  });

  it('has state classes', function() {
    expect(elementHasClass(componentEl, 'is-open')).to.be.true;
    expect(elementHasClass(componentEl, 'is-closed')).to.be.true;
    expect(elementHasClass(componentEl, 'is-stuckInTheMiddle')).to.be.false;

    expect(elementHasClass(componentEl, 'Component--isStuckInTheMiddle')).to.be.false;
  });

  it('transfers props', function() {
    expect(componentEl.id).to.equal('foobar');
  });

  it('preserves existing classes', function() {
    expect(elementHasClass(componentEl, 'foo')).to.be.true;
    expect(elementHasClass(componentEl, 'bar')).to.be.true;
  });

  it('transfers children', function() {
    expect(TestUtils.findRenderedDOMComponentWithClass.bind(null, component, 'child')).to.not.throw();
  });

  it('is a div by default', function() {
    expect(componentEl.nodeName).to.equal('DIV');
  });

  it('can be any HTML element', function() {
    expect(buttonComponentEl.nodeName).to.equal('BUTTON');
  });

});

function elementHasClass(el, className) {
  return (' ' + el.className + ' ').indexOf(' ' + className + ' ') > -1;
}
