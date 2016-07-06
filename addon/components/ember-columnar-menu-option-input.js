import Ember from 'ember';
import { keyDown } from 'ember-keyboard';

const {
  TextField,
  on
} = Ember;

export default TextField.extend({
  attributeBindings: ['columnIndex:data-column-index', 'rowIndex:data-row-index'],
  classNames: ['ember-columnar-menu-option-input', 'ember-columnar-menu-option-type'],
  hook: 'ember_columnar_menu_option_input',

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

  complete: on(keyDown('Enter'), function() {
    this.attrs.choose();
  })
});
