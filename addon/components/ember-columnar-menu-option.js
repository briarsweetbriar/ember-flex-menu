import Ember from 'ember';
import layout from '../templates/components/ember-columnar-menu-option';

const {
  Component,
  computed,
  get,
  isPresent
} = Ember;

const { and } = computed;
const { run: { next } } = Ember;

export default Component.extend({
  layout: layout,

  classNames: ['ember-columnar-menu-option'],
  classNameBindings: ['joinedClassNames', 'growClass'],
  hook: 'ember_columnar_menu_option',

  isInput: and('choice.inputable', 'inputOpen'),

  joinedClassNames: computed('choice.classNames', {
    get() {
      const classNames = get(this, 'choice.classNames');

      if (isPresent(classNames)) {
        return classNames.join(' ');
      }
    }
  }),

  growClass: computed('choice.grow', {
    get() {
      const grow = get(this, 'choice.grow');

      if (isPresent(grow)) {
        return `ember-columnar-menu-option-grow-${grow}`;
      }
    }
  }),

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
