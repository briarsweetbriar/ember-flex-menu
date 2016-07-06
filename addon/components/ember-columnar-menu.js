import Ember from 'ember';
import layout from '../templates/components/ember-columnar-menu';
import { keyDown, EKMixin } from 'ember-keyboard';
import { PerfectScrollbarMixin } from 'ember-perfect-scrollbar';

const {
  Component,
  computed,
  get,
  getProperties,
  isPresent,
  setProperties
} = Ember;

const { reads } = computed;

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

  choices: [],
  columns: 1,
  downKeys: ['ArrowDown'],
  leftKeys: ['ArrowLeft'],
  rightKeys: ['ArrowRight'],
  upKeys: ['ArrowUp'],
  loop: true,
  loopX: reads('loop'),
  loopY: reads('loop'),

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

  rows: computed('choices.[]', 'columns', {
    get() {
      return Math.ceil(get(this, 'choices.length') / get(this, 'columns'));
    }
  }),

  lastRowLength: computed('choices.[]', 'columns', {
    get() {
      return Math.ceil(get(this, 'choices.length') % get(this, 'columns'));
    }
  }),

  _focusDown(event) {
    const { currentColumnIndex, currentRowIndex, lastRowLength, loopY, rows } = getProperties(this, 'currentColumnIndex', 'currentRowIndex', 'lastRowLength', 'loopY', 'rows');
    const newRowIndex = currentRowIndex + 1 > rows - 1 && loopY ? 0 : currentRowIndex + 1;
    const newColumnIndex = newRowIndex === rows - 1 && currentColumnIndex > lastRowLength -1 ? lastRowLength - 1 : currentColumnIndex;

    this._focusTo(event, newColumnIndex, newRowIndex);
  },

  _focusLeft(event) {
    const { columns, currentColumnIndex, currentRowIndex, lastRowLength, loopX, rows } = getProperties(this, 'columns', 'currentColumnIndex', 'currentRowIndex', 'lastRowLength', 'loopX', 'rows');
    const lastColumnIndex = currentRowIndex === rows - 1 ? lastRowLength - 1 : columns - 1;
    const newColumnIndex = currentColumnIndex === 0 && loopX ? lastColumnIndex : currentColumnIndex - 1;

    this._focusTo(event, newColumnIndex, currentRowIndex);
  },

  _focusRight(event) {
    const { columns, currentColumnIndex, currentRowIndex, lastRowLength, loopX, rows } = getProperties(this, 'columns', 'currentColumnIndex', 'currentRowIndex', 'lastRowLength', 'loopX', 'rows');
    const lastColumnIndex = currentRowIndex === rows - 1 ? lastRowLength - 1 : columns - 1;
    const newColumnIndex = currentColumnIndex === lastColumnIndex && loopX ? 0 : currentColumnIndex + 1;

    this._focusTo(event, newColumnIndex, currentRowIndex);
  },

  _focusUp(event) {
    const { currentColumnIndex, currentRowIndex, lastRowLength, loopY, rows } = getProperties(this, 'currentColumnIndex', 'currentRowIndex', 'lastRowLength', 'loopY', 'rows');
    const newRowIndex = currentRowIndex - 1 < 0 && loopY ? rows - 1 : currentRowIndex - 1;
    const newColumnIndex = newRowIndex === rows - 1 && currentColumnIndex > lastRowLength -1 ? lastRowLength - 1 : currentColumnIndex;

    this._focusTo(event, newColumnIndex, newRowIndex);
  },

  _focusTo(event, columnIndex, rowIndex) {
    if (isPresent(event)) {
      event.preventDefault();
    }

    this.$(`[data-column-index="${columnIndex || 0}"][data-row-index="${rowIndex || 0}"]`).focus();
  },

  actions: {
    childGainedFocus(currentRowIndex, currentColumnIndex) {
      setProperties(this, { currentRowIndex, currentColumnIndex });
    },

    childLostFocus() {
      setProperties(this, { currentRowIndex: undefined, currentColumnIndex: undefined });
    }
  }
});
