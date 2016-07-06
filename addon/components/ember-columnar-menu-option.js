import Ember from 'ember';
import layout from '../templates/components/ember-columnar-menu-option';

const {
  Component,
  isPresent
} = Ember;

const { computed: { and } } = Ember;
const { run: { next } } = Ember;

export default Component.extend({
  layout: layout,

  classNames: ['ember-columnar-menu-option'],
  classNameBindings: ['choice.classNames'],
  hook: 'ember_columnar_menu_option',

  isInput: and('choice.inputable', 'inputOpen'),

  actions: {
    choose(choice) {
      this.attrs.choose(choice);
    },

    toggleInput() {
      this.toggleProperty('inputOpen');

      next(() => {
        const button = this.$('button');

        if (isPresent(button)) {
          button.focus();
        }
      });
    }
  }
});
