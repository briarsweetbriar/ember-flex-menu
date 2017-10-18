import Ember from 'ember';
import layout from '../templates/components/ember-flex-menu-option-input-accept';

const {
  computed,
  typeOf
} = Ember;

export default Ember.Component.extend({
  layout,
  tagName: 'button',
  classNames: ['ember-flex-menu-option-input-accept'],
  hook: 'ember_flex_menu_option_input_accept',

  choiceAcceptIconFamily: computed('iconFamily', 'choice.acceptIconFamily', 'choice.iconFamily', {
    get() {
      return this.get('choice.acceptIconFamily') || this.get('choice.iconFamily') || this.get('iconFamily');
    }
  }),

  focusIn(...args) {
    this._super(...args);

    this.attrs.gainedFocus();
  },

  focusOut(...args) {
    this._super(...args);

    this.attrs.lostFocus();
  },

  click(...args) {
    this._super(...args);

    this._tryFunction(this.attrs.choose);
    this._tryFunction(this.attrs.lostFocus);
  },

  touchEnd(...args) {
    this._super(...args);

    this._tryFunction(this.attrs.choose);
    this._tryFunction(this.attrs.lostFocus);
  },

  _tryFunction(fn) {
    if (typeOf(fn) === 'function') { fn(); }
  }
});
