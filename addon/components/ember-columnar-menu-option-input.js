import Ember from 'ember';
import { keyDown } from 'ember-keyboard';

const {
  TextField,
  on,
  getProperties
} = Ember;

export default TextField.extend({
  attributeBindings: ['columnIndex:data-column-index', 'rowIndex:data-row-index'],
  classNames: ['ember-columnar-menu-option-input', 'ember-columnar-menu-option-type'],
  hook: 'ember_columnar_menu_option_input',

  init(...args) {
    this._super(...args);

    const { acceptKeys, cancelKeys } = getProperties(this, 'acceptKeys', 'cancelKeys');

    acceptKeys.forEach((key) => this.on(keyDown(key), (event) => this._accept(event)));
    cancelKeys.forEach((key) => this.on(keyDown(key), (event) => this._cancel(event)));
  },

  didInsertElement(...args) {
    this._super(...args);

    this.$().focus();
  },

  focusIn(...args) {
    this._super(...args);
    this.attrs.childGainedFocus();
  },

  focusOut(...args) {
    this._super(...args);
    this.attrs.childLostFocus();
    this.attrs.toggleInput();
  },

  _accept() {
    this.attrs.choose();
  },

  _cancel() {
    this.attrs.toggleInput();
  }
});
