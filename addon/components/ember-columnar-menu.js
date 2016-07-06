import Ember from 'ember';
import layout from '../templates/components/ember-columnar-menu';
import { keyDown, EKMixin } from 'ember-keyboard';
import { PerfectScrollbarMixin } from 'ember-perfect-scrollbar';
import { configurable } from 'affinity-engine';

const {
  Component,
  get,
  getProperties,
  isPresent
} = Ember;

const { run: { next } } = Ember;

const mixins = [
  EKMixin,
  PerfectScrollbarMixin
];

export default Component.extend(...mixins, {
  layout,

  classNames: ['ember-columnar-menu'],
  classNameBindings: ['customClassNames'],
  hook: 'ember_columnar_menu',

  perfectScrollbarOptions: {
    suppressScrollX: true
  },

  columns: 1,
  downKeys: ['ArrowDown'],
  leftKeys: ['ArrowLeft'],
  rightKeys: ['ArrowRight'],
  upKeys: ['ArrowUp'],

  init(...args) {
    this._super(...args);

    const { downKeys, leftKeys, rightKeys, upKeys } = getProperties(this, 'downKeys', 'leftKeys', 'rightKeys', 'upKeys');

    downKeys.forEach((key) => this.on(keyDown(key), (event) => this._focusDown(event)));
    leftKeys.forEach((key) => this.on(keyDown(key), (event) => this._focusLeft(event)));
    rightKeys.forEach((key) => this.on(keyDown(key), (event) => this._focusRight(event)));
    upKeys.forEach((key) => this.on(keyDown(key), (event) => this._focusUp(event)));
  },

  didInsertElement(...args) {
    this._super(...args);

    next(() => {
      if (get(this, 'keyboardActivated')) {
        this._focusDown();
      }
    });
  },

  columnizedChoices: computed('choices.[]', 'columns', {
    get() {
      const { choices, columns } = getProperties(this, 'choices', 'columns');

      return choices.reduce((columnizedChoices, choice, index) => {
        if (index%columns === 0) {
          columnizedChoices.pushObject(Ember.A([choice]));
        } else {
          get(columnizedChoices, 'lastObject').pushObject(choice);
        }

        return columnizedChoices;
      }, Ember.A());
    }
  }),

  _focusDown(event) {
    this._keyboardEvent(event, (index, length) => {
      return index + 1 === length ? 0 : index + 1;
    });
  },

  _focusUp(event) {
    this._keyboardEvent(event, (index, length) => {
      return index - 1 < 0 ? length - 1 : index - 1;
    });
  },

  _keyboardEvent(event, indexCallback) {
    if (isPresent(event)) {
      event.preventDefault();
    }

    const choices = this.$('button');
    const current = document.activeElement;
    const index = choices.index(current);
    const length = choices.length;
    const newIndex = indexCallback(index, length);

    choices.eq(newIndex).focus();
  }
});
