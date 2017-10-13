import Ember from 'ember';
import layout from '../templates/components/ember-flex-menu-option-input-container';

const { typeOf } = Ember;
const { run: { next } } = Ember;

export default Ember.Component.extend({
  layout,
  classNames: ['ember-flex-menu-option-input-container', 'ember-flex-menu-option-type'],

  _gainFocus() {
    this.set('focused', false);
    this._tryFunction(this.attrs.childGainedFocus);
  },

  _loseFocus() {
    this.set('focused', false);
    this._tryFunction(this.attrs.childLostFocus);
    this._tryFunction(this.attrs.toggleInput);
  },

  _resetChildFocus() {
    this.setProperties({
      childFocusGained: false,
      childFocusLost: false
    });
  },

  _tryFunction(fn) {
    if (typeOf(fn) === 'function') { fn(); }
  },

  actions: {
    gainedFocus() {
      this.set('childFocusGained', true);

      if (!this.get('focused')) {
        this._gainFocus();
      }

      next(() => {
        if (this.get('isDestroyed')) return;

        this._resetChildFocus();
      });
    },

    lostFocus() {
      this.set('childFocusLost', true);

      next(() => {
        if (this.get('isDestroyed')) return;

        if (!this.get('childFocusGained')) {
          this._loseFocus();
        }
        this._resetChildFocus();
      });
    }
  }
});
