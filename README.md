[![npm version](https://badge.fury.io/js/ember-flex-menu.svg)](https://badge.fury.io/js/ember-flex-menu)
[![Build Status](https://travis-ci.org/null-null-null/ember-flex-menu.svg?branch=master)](https://travis-ci.org/null-null-null/ember-flex-menu)

# ember-flex-menu

`ember-flex-menu` is a flexible menu component that has built-in support for keyboard navigation, multiple column layouts, and buttons that can toggle into inputs.

## Installation

`ember install ember-flex-menu`

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
{{ember-flex-menu choices=choices onChoose=(action "myAction")}}
```

```scss
// styles/app.scss
@import "ember-flex-menu/ember-flex-menu";
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
{{ember-flex-menu choices=choices columns=5}}
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
{{ember-flex-menu moveDownKeys=customMoveDown}}
```

Consult the [`ember-keyboard`](https://github.com/null-null-null/ember-keyboard) docs for more info on key names.
