import Ember from 'ember';
import layout from '../templates/components/ember-flex-menu';
import { keyDown, EKMixin } from 'ember-keyboard';
import { PerfectScrollbarMixin } from 'ember-perfect-scrollbar';

const {
  Component,
  computed,
  get,
  getProperties,
  isBlank,
  isPresent,
  set,
  setProperties,
  typeOf
} = Ember;

const { reads } = computed;

const { run: { next } } = Ember;

const mixins = [
  EKMixin,
  PerfectScrollbarMixin
];

export default Component.extend(...mixins, {
  layout,

  classNames: ['ember-flex-menu'],
  classNameBindings: ['customClassNames'],
  hook: 'ember_flex_menu',

  perfectScrollbarOptions: {
    suppressScrollX: true
  },

  choices: [],
  columns: 1,
  acceptKeys: ['Enter'],
  cancelKeys: ['Escape'],
  moveDownKeys: ['ArrowDown'],
  moveLeftKeys: ['ArrowLeft'],
  moveRightKeys: ['ArrowRight'],
  moveUpKeys: ['ArrowUp'],
  loop: true,
  loopX: reads('loop'),
  loopY: reads('loop'),

  init(...args) {
    this._super(...args);

    const { moveDownKeys, moveLeftKeys, moveRightKeys, moveUpKeys } = getProperties(this, 'moveDownKeys', 'moveLeftKeys', 'moveRightKeys', 'moveUpKeys');

    moveDownKeys.forEach((key) => this.on(keyDown(key), (event) => this._focusDown(event)));
    moveLeftKeys.forEach((key) => this.on(keyDown(key), (event) => this._focusLeft(event)));
    moveRightKeys.forEach((key) => this.on(keyDown(key), (event) => this._focusRight(event)));
    moveUpKeys.forEach((key) => this.on(keyDown(key), (event) => this._focusUp(event)));
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
      let column = 0;

      return choices.reduce((columnizedChoices, choice) => {
        const choiceObject = this._prepChoice(choice);
        const choiceSize = get(choiceObject, 'grow') || 1;

        column += choiceSize;

        if (column > columns) {
          columnizedChoices.pushObject(Ember.A([choiceObject]));
          column = choiceSize;
        } else {
          get(columnizedChoices, 'lastObject').pushObject(choiceObject);
        }

        return columnizedChoices;
      }, Ember.A([Ember.A()]));
    }
  }),

  _prepChoice(arg) {
    const choice = typeOf(arg) === 'object' ? arg : { text: arg, value: arg };

    if (get(choice, 'slider')) {
      if (isBlank(get(choice, 'value'))) {
        set(choice, 'value', get(choice, 'slider.start'));
      }

      set(choice, 'alwaysSelected', true);
    } else if (isBlank(get(choice, 'value')) && !get(choice, 'inputable')) {
      set(choice, 'value', get(choice, 'text'));
    }

    if (get(choice, 'alwaysSelected')) {
      set(choice, 'selected', true);
    }

    return choice;
  },

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
    const newColumnIndex = newRowIndex === rows - 1 && currentColumnIndex > lastRowLength - 1 && lastRowLength > 1 ? lastRowLength - 1 : currentColumnIndex;

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
    const newColumnIndex = newRowIndex === rows - 1 && currentColumnIndex > lastRowLength - 1 && lastRowLength > 1 ? lastRowLength - 1 : currentColumnIndex;

    this._focusTo(event, newColumnIndex, newRowIndex);
  },

  _focusTo(event, columnIndex, rowIndex) {
    if (isPresent(event)) {
      event.preventDefault();
    }

    this.$(`[data-column-index="${columnIndex || 0}"][data-row-index="${rowIndex || 0}"]`).focus();
  },

  actions: {
    choose(choice) {
      this.attrs.onChoice(choice);
    },

    childGainedFocus(currentRowIndex, currentColumnIndex) {
      setProperties(this, { currentRowIndex, currentColumnIndex });
    },

    childLostFocus() {
      setProperties(this, { currentRowIndex: undefined, currentColumnIndex: undefined });
    },

    chooseMulti(choice) {
      set(choice, 'selections', get(this, 'choices').filter((choice) => get(choice, 'selected')));

      this.send('choose', choice);
    }
  }
});
