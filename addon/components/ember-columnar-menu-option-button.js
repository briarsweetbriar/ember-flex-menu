import Ember from 'ember';
import layout from '../templates/components/ember-columnar-menu-option-button';

const {
  Component,
  computed,
  get
} = Ember;

export default Component.extend({
  layout,

  attributeBindings: ['columnIndex:data-column-index', 'rowIndex:data-row-index'],
  classNameBindings: ['choice.class'],
  classNames: ['ember-columnar-menu-option-button', 'ember-columnar-menu-option-type'],
  hook: 'ember_columnar_menu_option_button',
  tagName: 'button',

  iconFamily: computed('choice.iconFamily', {
    get() {
      return get(this, 'choice.iconFamily') || get(this, 'iconFamily');
    }
  }),

  click(...args) {
    this._super(...args);
    this.handleAction();
  },

  submit(...args) {
    this._super(...args);
    this.handleAction();
  },

  focusIn(...args) {
    this._super(...args);
    this.attrs.childGainedFocus();
  },

  focusOut(...args) {
    this._super(...args);
    this.attrs.childLostFocus();
  },

  handleAction() {
    if (get(this, 'choice.inputable')) {
      this.attrs.toggleInput();
    } else {
      this.attrs.choose();
    }
  }
});
