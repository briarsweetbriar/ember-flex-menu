[![npm version](https://badge.fury.io/js/ember-columnar-menu.svg)](https://badge.fury.io/js/ember-columnar-menu)
[![Build Status](https://travis-ci.org/null-null-null/ember-columnar-menu.svg?branch=master)](https://travis-ci.org/null-null-null/ember-columnar-menu)

# ember-columnar-menu

`ember-columnar-menu` is a flexible menu component that has built-in support for keyboard navigation, multiple column layouts, and buttons that can toggle into inputs.

## Installation

`ember install ember-columnar-menu`

## Usage

```js
export default Ember.Controller.extend({
  choices: ['foo', 'bar', 'baz'],

  actions: {
    myAction(choice) {
      console.log(choice);
    }
  }
});
```

```hbs
{{ember-columnar-menu choices=choices onChoose=(action "myAction")}}
```

```scss
// styles/app.scss
@import "ember-columnar-menu/ember-columnar-menu";
```

This results in a single column menu with buttons 'foo', 'bar', and 'baz'. If 'bar' is clicked, then 'myAction' will receive:

```js
myAction(choice) {
  console.log(choice); // { text: 'bar', value: 'bar' }
}
```

### `inputable`

```js
export default Ember.Controller.extend({
  choices: ['foo', { text: 'bar', inputable: true }, 'baz'],

  actions: {
    myAction(choice) {
      console.log(choice); // { text: 'bar', value: 'the value that was input' }
    }
  }
});
```

### `columns`

To display multiple columns:

```hbs
{{ember-columnar-menu choices=choices columns=5}}
```

### Key Bindings

By default:

* acceptKeys: ['Enter']
* cancelKeys: ['Escape']
* moveDown: ['ArrowDown']
* moveLeft: ['ArrowLeft']
* moveRight: ['ArrowRight']
* moveUp: ['ArrowUp']

```js
export default Ember.Component.extend({
  customMoveDown: ['KeyS']
})
```

```hbs
{{ember-columnar-menu moveDownKeys=customMoveDown}}
```

Consult the [`ember-keyboard`](https://github.com/null-null-null/ember-keyboard) docs for more info on key names.
