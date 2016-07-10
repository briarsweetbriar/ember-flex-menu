import Ember from 'ember';
import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { hook, initialize as initializeHook } from 'ember-hook';

const { set } = Ember;

moduleForComponent('ember-columnar-menu-option', 'Integration | Component | ember columnar menu option', {
  integration: true,

  beforeEach() {
    initializeHook();
  }
});

test('it renders the choice class', function(assert) {
  assert.expect(2);

  this.set('choice', {
    classNames: ['foo', 'bar']
  });

  this.render(hbs`{{ember-columnar-menu-option choice=choice}}`);

  assert.ok(this.$(hook('ember_columnar_menu_option')).hasClass('foo'), 'renders first class');
  assert.ok(this.$(hook('ember_columnar_menu_option')).hasClass('bar'), 'renders second class');
});

test('it renders the choice grow class', function(assert) {
  assert.expect(1);

  this.set('choice', {
    grow: 3
  });

  this.render(hbs`{{ember-columnar-menu-option choice=choice}}`);

  assert.ok(this.$(hook('ember_columnar_menu_option')).hasClass('ember-columnar-menu-option-grow-3'), 'renders grow class');
});

test('it renders an input when both `choice.inputable` and `inputOpen` are true', function(assert) {
  assert.expect(2);

  set(this, 'childGainedFocus', () => {});

  this.render(hbs`{{ember-columnar-menu-option choice=(hash inputable=true) inputOpen=true childGainedFocus=(action childGainedFocus) }}`);

  assert.ok(this.$(hook('ember_columnar_menu_option_button')).length === 0, 'it does not render a button');
  assert.ok(this.$(hook('ember_columnar_menu_option_input')).length === 1, 'it renders an input');
});

test('it renders a button when both `choice.inputable` and `inputOpen` are false', function(assert) {
  assert.expect(2);

  this.render(hbs`{{ember-columnar-menu-option choice=(hash inputable=false) inputOpen=false}}`);

  assert.ok(this.$(hook('ember_columnar_menu_option_button')).length === 1, 'it renders a button');
  assert.ok(this.$(hook('ember_columnar_menu_option_input')).length === 0, 'it does not render an input');
});

test('it renders a button when `choice.inputable` is true but `inputOpen` is false', function(assert) {
  assert.expect(2);

  this.render(hbs`{{ember-columnar-menu-option choice=(hash inputable=true) inputOpen=false}}`);

  assert.ok(this.$(hook('ember_columnar_menu_option_button')).length === 1, 'it renders a button');
  assert.ok(this.$(hook('ember_columnar_menu_option_input')).length === 0, 'it does not render an input');
});

test('it renders a button when both `choice.inputable` is false but `inputOpen` is true', function(assert) {
  assert.expect(2);

  this.render(hbs`{{ember-columnar-menu-option choice=(hash inputable=false) inputOpen=true}}`);

  assert.ok(this.$(hook('ember_columnar_menu_option_button')).length === 1, 'it renders a button');
  assert.ok(this.$(hook('ember_columnar_menu_option_input')).length === 0, 'it does not render an input');
});
