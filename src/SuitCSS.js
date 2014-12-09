'use strict';

import React from 'react/addons';
import { camel, squish } from 'case';

let { PropTypes } = React;
let { classSet: cx, PureRenderMixin } = React.addons;

let SuitCSS = React.createClass({

  mixins: [PureRenderMixin],

  propTypes: {
    componentName: PropTypes.string.isRequired,
    modifiers: PropTypes.arrayOf(PropTypes.string),
    states: PropTypes.arrayOf(PropTypes.string),
    element: PropTypes.string,
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
        modifier => this.props[`is${squish(modifier)}`]
      )
      .map(
        modifier => `is-${camel(modifier)}`
      );
  },

  render() {
    let Element = this.props.element;

    let classes = [
      this.baseClass(),
      this.props.className,
    ]
      .concat(this.modifierClasses())
      .concat(this.stateClasses())

    let className = cx(
      classes.reduce((result, c) => {
        result[c] = true;
        return result;
      }, {})
    );

    return (
      <Element
        {...this.props}
        className={className}
      />
    );
  },

});

export default SuitCSS;
