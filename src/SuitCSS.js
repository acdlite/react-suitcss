'use strict';

import React from 'react/addons';
import { camel, squish } from 'case';

let { PropTypes } = React;
let { PureRenderMixin } = React.addons;

let SuitCSS = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    componentName: PropTypes.string.isRequired,
    modifiers: PropTypes.arrayOf(PropTypes.string),
    states: PropTypes.arrayOf(PropTypes.string),
  },

  getDefaultProps() {
    return {
      element: 'div',
      modifiers: [],
      states: [],
    };
  },

  baseClass() {
    return this.props.componentName;
  },

  modifierClasses() {
    let baseClass = this.baseClass();

    return this.props.modifiers
      .filter(
        modifier => this.props[modifier] === true
      )
      .map(
        modifier => `${baseClass}--${camel(modifier)}`
      );
  },

  stateClasses() {
    return this.props.states
      .filter(
        modifier => this.props[`is${squish(modifier)}`] === true
      )
      .map(
        modifier => `is-${camel(modifier)}`
      );
  },

  render() {
    let Element = this.props.element;

    let classes = [
      this.baseClass(),
    ]
      .concat(this.modifierClasses())
      .concat(this.stateClasses());

    if (this.props.className) classes.push(this.props.className);

    let className = classes.filter(Boolean).join(' ');

    return (
      <Element
        {...this.props}
        className={className}
      />
    );
  },

});

export default SuitCSS;
