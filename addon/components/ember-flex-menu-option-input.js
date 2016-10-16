import Ember from 'ember';
import { keyDown } from 'ember-keyboard';

const {
  TextField,
  getProperties,
  isPresent
} = Ember;

const { run: { next } } = Ember;

export default TextField.extend({
  attributeBindings: ['columnIndex:data-column-index', 'rowIndex:data-row-index'],
  classNames: ['ember-flex-menu-option-input', 'ember-flex-menu-option-type'],
  hook: 'ember_flex_menu_option_input',

  init(...args) {
    this._super(...args);

    const { acceptKeys, cancelKeys } = getProperties(this, 'acceptKeys', 'cancelKeys');

    if (isPresent(acceptKeys)) { acceptKeys.forEach((key) => this.on(keyDown(key), (event) => this._accept(event))); }
    if (isPresent(cancelKeys)) { cancelKeys.forEach((key) => this.on(keyDown(key), (event) => this._cancel(event))); }
  },

  didInsertElement(...args) {
    this._super(...args);

    next(() => this.$().focus());
  },

  focusIn(...args) {
    this.attrs.childGainedFocus();
    this._super(...args);
  },

  focusOut(...args) {
    this.attrs.childLostFocus();
    this.attrs.toggleInput();
    this._super(...args);
  },

  _accept() {
    this.attrs.choose();
  },

  _cancel() {
    this.attrs.toggleInput();
  }
});
