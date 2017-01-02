import Ember from 'ember';
import layout from '../templates/components/ember-flex-menu-option';

const {
  Component,
  computed,
  get,
  isPresent,
  set
} = Ember;

const { and } = computed;
const { run: { next } } = Ember;

export default Component.extend({
  layout: layout,

  classNames: ['ember-flex-menu-option'],
  classNameBindings: ['joinedClassNames', 'growClass', 'choice.selected'],
  hook: 'ember_flex_menu_option',

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
        return `ember-flex-menu-option-grow-${grow}`;
      }
    }
  }),

  actions: {
    choose(choice) {
      if (get(choice, 'multi')) {
        if (!get(choice, 'alwaysSelected')) {
          set(choice, 'selected', get(choice, 'selected') ? false : true);
        }
      } else if (get(choice, 'multiSubmit')) {
        this.attrs.chooseMulti(choice);
      } else {
        this.attrs.choose(choice);
      }
    },

    toggleInput() {
      this.toggleProperty('inputOpen');

      next(() => {
        const button = this.$('button');

        if (isPresent(button)) {
          button.focus();
        }
      });
    },

    sliderChange(value) {
      set(this, 'choice.value', value);
    }
  }
});
