[![Build Status](https://img.shields.io/travis/acdlite/react-suitcss.svg)](https://travis-ci.org/acdlite/react-suitcss)

react-suitcss
=================

Build React components that conform to SUIT CSS naming conventions. Express a component's modifiers and states as React props, and react-suitcss will output the proper classes into the DOM.

```
npm install --save react-suitcss
```

## Usage

Use react-css to create a base component module. Specify which modifiers and states are accepted. For instance, here's how you might create a toolbar component:

```jsx

var React = require('react');
var SuitCSS = require('react-suitcss');

var Toolbar = React.createClass({

  render() {
    <SuitCSS
      {...this.props}
      componentName="Toolbar"
      modifiers={['big', 'compact', 'red']}
      states={['open', 'closed']}
    >

      ...

    </SuitCSS>
  }

});

```

Then you can use your new component like so:

```jsx
<Toolbar />
// <div class="Toolbar" />

<Toolbar compact />
// <div class="Toolbar Toolbar--compact" />

<Toolbar isOpen />
// <div class="Toolbar is-open" />

<Toolbar compact isOpen />
// <div class="Toolbar Toolbar--compact is-open" />
```

## Available props

* `componentName` - Base class name.
* `modifiers` - Whitelist of accepted modifiers.
* `states` - Whitelist of accepted states. Whitelist values of the form `state` correspond to properties of the form `isState`. So if the whitelist contains `open` and `this.props.isOpen` is true, the DOM element gets class `is-open`.
* element - String of DOM element to use. Defaults to `div`.

## License
MIT
